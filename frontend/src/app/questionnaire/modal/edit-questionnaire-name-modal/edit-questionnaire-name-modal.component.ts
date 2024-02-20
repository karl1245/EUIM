import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { QuestionnaireResponse } from '../../model/questionnaire-response';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
  selector: 'app-edit-questionnaire-modal',
  templateUrl: './edit-questionnaire-name-modal.component.html',
  styleUrls: ['./edit-questionnaire-name-modal.component.css']
})
export class EditQuestionnaireModalComponent {
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
    console.log(questionnaires)
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
