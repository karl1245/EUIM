import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureGroupService } from './service/feature-group.service';
import { FeatureGroupResponse } from './model/feature-group-response';
import { MatTabGroup } from '@angular/material/tabs';
import { StakeholderService } from '../stakeholder/service/stakeholder.service';
import { StakeholderResponse } from '../stakeholder/model/stakeholder-response';
import { GlobalConstants } from '../constants/global-constants';

@Component({
  selector: 'app-feature-group',
  templateUrl: './feature-group.component.html',
  styleUrls: ['./feature-group.component.css']
})
export class FeatureGroupComponent {
  featureGroups: FeatureGroupResponse[] = [];
  stakeholders: StakeholderResponse[] = [];

  questionnaireId: number;
  loading: boolean = true;
  isToggledGroupAdding: boolean = false;
  isToggledStakeholderAdding: boolean = false;
  defaultTabIndex = 0;
  featureGroupName: string;
  stakeholderName: string;
  @ViewChild('featureGroupTabs', {static: false}) tab: MatTabGroup;

  constructor(
    private featureGroupService: FeatureGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private stakeholderService: StakeholderService
  ) {}

  ngOnInit(): void {
    const questionnaireId = this.route.snapshot.queryParamMap.get('questionnaireId');
    if (!questionnaireId  || isNaN(Number(questionnaireId))) {
      this.router.navigate(['questionnaire']);
      return;
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
          this.tab.selectedIndex = 0;
        });
      });

    this.stakeholderService
      .getStakeholdersByQuestionnaireId(this.questionnaireId)
      .subscribe((next) => {
        this.stakeholders = next.sort((a,b) => a.id - b.id);
        this.loading = false;
        setTimeout(() => {
          this.tab.selectedIndex = 0;
        });
      });
  }


  createNewFeatureGroup(featureGroupName: string) {
    this.featureGroupService.createFeatureGroup(this.questionnaireId, featureGroupName)
      .subscribe(next => this.featureGroups.push(next))
  }

  createNewStakeholder(stakeholderName: string) {
    this.stakeholderService.createStakeholder(this.questionnaireId, stakeholderName)
      .subscribe(next => this.stakeholders.push(next))
  }

  getStakeholderColorClass(i: number): string {
    let colorIndex = i % GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
    return GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
  }
}
