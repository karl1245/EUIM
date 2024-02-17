import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-questionnaire-modal',
  templateUrl: './edit-questionnaire-modal.component.html',
  styleUrls: ['./edit-questionnaire-modal.component.css']
})
export class EditQuestionnaireModalComponent {
  questionnaireName: string = '';
  public onClose: Subject<{ editQuestionnaire: boolean}>;

  constructor(private modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  close(editQuestionnaire: boolean): void {
    this.onClose.next({editQuestionnaire: editQuestionnaire});
    this.modalRef.hide();
  }
}
