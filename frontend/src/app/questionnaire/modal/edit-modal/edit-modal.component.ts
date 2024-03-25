import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { QuestionnaireResponse } from '../../model/questionnaire-response';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  @Input() isProject: boolean;
  @Input() isFeatureGroup: boolean;
  @Input() isStakeholder: boolean;

  questionnaire: any = {};
  questionnairesList: QuestionnaireResponse[] = [];
  // updateName: Function = () => {};
  public onClose: Subject<{ editQuestionnaire: boolean}>;

  constructor(
    private questionnaireService: QuestionnaireService,
    private modalRef: BsModalRef
    ) {}

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  close(editQuestionnaire: boolean): void {
    this.onClose.next({editQuestionnaire: editQuestionnaire});
    this.modalRef.hide();
  }

  updateName(event: any, id: number, questionnaires: QuestionnaireResponse[]) {
    const selectedQuestionnaire = questionnaires.find(o => o.id === id);

    if (selectedQuestionnaire) {
      selectedQuestionnaire.name = event.target.value;

      this.questionnaireService.saveQuestionnaire({id: id, name: selectedQuestionnaire.name})
      .subscribe(next => {
        const questionnaire = questionnaires.find(o => o.id === id);

        if (questionnaire) {
          questionnaire.name = selectedQuestionnaire.name;
        }
      });
    }
  }
}
