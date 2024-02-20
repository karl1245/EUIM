import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureGroupService } from './service/feature-group.service';
import { FeatureGroupResponse } from './model/feature-group-response';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-feature-group',
  templateUrl: './feature-group.component.html',
  styleUrls: ['./feature-group.component.css']
})
export class FeatureGroupComponent {
  featureGroups: FeatureGroupResponse[] = [];
  questionnaireId: number;
  loading: boolean = true;
  defaultTabIndex = 0;
  addNewFeatureGroupOpenState = false;
  featureGroupName: string;
  @ViewChild('featureGroupTabs', {static: false}) tab: MatTabGroup;

  constructor(
    private featureGroupService: FeatureGroupService,
    private route: ActivatedRoute,
    private router: Router,
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
  }

  toggleAddNewFeatureGroupOpenState() {
    this.addNewFeatureGroupOpenState = !this.addNewFeatureGroupOpenState;
  }

  createFeature() {

  }

  createNewFeatureGroup(featureGroupName: string) {
    this.featureGroupService.createFeatureGroup(this.questionnaireId, featureGroupName)
      .subscribe(next => this.featureGroups.push(next))
  }
}
