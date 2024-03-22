import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureGroupService } from './service/feature-group.service';
import { FeatureGroupResponse } from './model/feature-group-response';
import { MatTabGroup } from '@angular/material/tabs';
import { StakeholderService } from '../stakeholder/service/stakeholder.service';
import { StakeholderResponse } from '../stakeholder/model/stakeholder-response';
import { GlobalConstants } from '../constants/global-constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteModalComponent } from '../questionnaire/modal/delete-modal/delete-modal.component';
import { EditModalComponent } from '../questionnaire/modal/edit-modal/edit-modal.component';

@Component({
  selector: 'app-feature-group',
  templateUrl: './feature-group.component.html',
  styleUrls: ['./feature-group.component.css']
})
export class FeatureGroupComponent implements OnInit {
  featureGroups: FeatureGroupResponse[] = [];
  stakeholders: StakeholderResponse[] = [];

  questionnaireId: number;
  tabIndex: number;
  loading: boolean = true;
  tabsLoading: boolean = false;
  isToggledGroupAdding: boolean = false;
  isToggledStakeholderAdding: boolean = false;
  featureGroupName: string;
  stakeholderName: string;
  @ViewChild('featureGroupTabs', {static: false}) tab: MatTabGroup;
  modalRef: BsModalRef;

  constructor(
    private featureGroupService: FeatureGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private stakeholderService: StakeholderService,
    private modalService: BsModalService
    ) {}

  ngOnInit(): void {
    const questionnaireId = this.route.snapshot.queryParamMap.get('questionnaireId');
    const tabIndex = this.route.snapshot.queryParamMap.get('tabIndex');
    if (!questionnaireId  || isNaN(Number(questionnaireId))) {
      this.router.navigate(['questionnaire']);
      return;
    }
    if (!(!tabIndex || isNaN(Number(tabIndex)))) {
      this.tabIndex = +tabIndex;
    }
    this.questionnaireId = +questionnaireId;

    this.getData();
  }

  toggleAddNewGroup(): void {
    this.isToggledGroupAdding = !this.isToggledGroupAdding;
  }

  toggleAddNewStakeholder(): void {
    this.isToggledStakeholderAdding = !this.isToggledStakeholderAdding;
  }

  getData(): void {
    this.featureGroupService
      .getFeatureGroupsByQuestionnaireId(this.questionnaireId)
      .subscribe((next) => {
        this.featureGroups = next.sort((a,b) => a.id - b.id);
        this.loading = false;
        setTimeout(() => {
          this.tab.selectedIndex = this.tabIndex;
        });
      });

    this.stakeholderService
      .getStakeholdersByQuestionnaireId(this.questionnaireId)
      .subscribe((next) => {
        this.stakeholders = next.sort((a,b) => a.id - b.id);
        this.loading = false;
        setTimeout(() => {
          this.tab.selectedIndex = this.tabIndex;
        });
      });
  }


  createNewFeatureGroup(featureGroupName: string) {
    this.featureGroupService.createFeatureGroup(this.questionnaireId, featureGroupName)
      .subscribe(next => {
        this.featureGroups.push(next);
      })
  }

  createNewStakeholder(stakeholderName: string) {
    this.stakeholderService.createStakeholder(this.questionnaireId, stakeholderName)
      .subscribe(next => this.stakeholders.push(next))
  }

  deleteStakeholder(id: number) {
    this.tabsLoading = true;
    this.stakeholderService.deleteStakeholder(id)
      .subscribe(next =>  {
        this.stakeholders = this.stakeholders.filter(s => s.id !== id)
        this.tabsLoading = false;
      })
  }

  deleteFeatureGroup(id: number) {
    this.tabsLoading = true;
    this.featureGroupService.deleteFeatureGroup(id)
      .subscribe(next => {
        this.featureGroups = this.featureGroups.filter(fg => fg.id !== id)
        this.tabsLoading = false;
      })
  }

  getStakeholderColorClass(i: number): string {
    let colorIndex = i % GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
    return GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
  }

  getStakeHolderDeleteAction(id: number): any {
    return () => this.deleteStakeholder(id)
  }

  openFeatureGroupDeleteModal(featureGroup: FeatureGroupResponse) {
    const initialState = {
      isFeatureGroup: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-box modal-md', initialState
    });
    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result.deleteObject) {
      }
    });
  }

  openFeatureGroupEditModal(featureGroup: FeatureGroupResponse) {
    const initialState = {
      isFeatureGroup: true
    };
    this.modalRef = this.modalService.show(EditModalComponent, {
      class: 'modal-box modal-md', initialState
    });
  }

  openStakeholderDeleteModal(stakeholder: StakeholderResponse) {
    const initialState = {
      isStakeholder: true
    };
    this.modalRef = this.modalService.show(DeleteModalComponent, {
      class: 'modal-box modal-md', initialState
    });
    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result.deleteObject) {console.log(result);
        this.deleteStakeholder(stakeholder.id);
      }
    });
  }

  openStakeholderEditModal(stakeholder: StakeholderResponse) {
    const initialState = {
      isStakeholder: true
    };
    this.modalRef = this.modalService.show(EditModalComponent, {
      class: 'modal-box modal-md', initialState
    });
  }

  getFeatureGroupEditAction(featureGroup: any):any {
    return () => this.openFeatureGroupEditModal(featureGroup);
  }

  getFeatureGroupDeleteAction(featureGroup: any):any {
    return () => this.openFeatureGroupDeleteModal(featureGroup);
  }

  getStakeholderEditAction(stakeholder: any):any {
    return () => this.openStakeholderEditModal(stakeholder);
  }

  getStakeholderDeleteAction(stakeholder: any):any {
    return () => this.openStakeholderDeleteModal(stakeholder);
  }
  //this.getStakeHolderDeleteAction(stakeholder.id)
}
