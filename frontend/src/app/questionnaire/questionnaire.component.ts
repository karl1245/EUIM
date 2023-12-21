import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './service/questionnaire.service';
import { QuestionnaireResponse } from './model/questionnaire-response';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  DeleteQuestionnaireModalComponent
} from './modal/delete-questionnaire-modal/delete-questionnaire-modal.component';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  loading: boolean = true;
  questionnaires: QuestionnaireResponse[] = [];
  questionnaireName: string = '';
  currentlyEditingQuestionnaires: any[] = [];
  validationPath = "/validation"
  // @ts-ignore
  modalRef: BsModalRef;

  constructor(
    private questionnaireService: QuestionnaireService,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    this.getQuestionnaires();
  }

  getQuestionnaires(): void {
    this.loading = true;
    this.questionnaireService.getQuestionnaires().subscribe(
      next => {
        this.questionnaires = next;
        this.loading = false;
      }
    );
  }

  addNewQuestionnaire(questionnaireName: string) {
    this.questionnaireService.saveQuestionnaire({id: null, name: questionnaireName}).subscribe(
      next => {
        this.getQuestionnaires();
      }
    )
  }

  setQuestionnaireAsEditing(questionnaire: QuestionnaireResponse) {
    this.currentlyEditingQuestionnaires.push({id: questionnaire.id, name: questionnaire.name})
  }

  updateQuestionnaireName(id: number) {
    const editedQuestionnaire = this.currentlyEditingQuestionnaires.find(o => o.id === id);
    this.questionnaireService.saveQuestionnaire(
      {id: id, name: editedQuestionnaire.name}
    ).subscribe(next => {
      const questionnaire = this.questionnaires.find(o => o.id === id);
      if (questionnaire) {
        questionnaire.name = editedQuestionnaire.name;
      }
     this.removeQuestionnaireAsEditing(id)
    });
  }

  removeQuestionnaireAsEditing(id: number) {
    this.currentlyEditingQuestionnaires = this.currentlyEditingQuestionnaires.filter(o => o.id !== id);
  }

  getEditingQuestionnaire(id: number): any {
    return this.currentlyEditingQuestionnaires.find(o => o.id === id);
  }

  updateName(event: any, id: number) {
    this.getEditingQuestionnaire(id).name = event.target.value;
  }

  deleteQuestionnaire(questionnaire: QuestionnaireResponse) {
    const initialState = {
      questionnaireName: questionnaire.name
    };
    this.modalRef = this.modalService.show(DeleteQuestionnaireModalComponent, {
      class: 'modal-box modal-md', initialState
    });
    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result.deleteQuestionnaire) {
        this.loading = true;
        this.questionnaireService.deleteQuestionnaire(questionnaire.id).subscribe( next => {
          this.removeQuestionnaireAsEditing(questionnaire.id)
          this.questionnaires = this.questionnaires.filter(q => q.id !== questionnaire.id);
          this.loading = false;

          }, () => this.loading = false
        )
      }
    });

  }
}
