import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-questionnaire-modal',
  templateUrl: './delete-questionnaire-modal.component.html',
  styleUrls: ['./delete-questionnaire-modal.component.css']
})
export class DeleteQuestionnaireModalComponent {
  questionnaireName: string = '';
  public onClose: Subject<{ deleteQuestionnaire: boolean}>;

  constructor(private modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  close(deleteQuestionnaire: boolean): void {
    this.onClose.next({deleteQuestionnaire: deleteQuestionnaire});
    this.modalRef.hide();
  }
}
