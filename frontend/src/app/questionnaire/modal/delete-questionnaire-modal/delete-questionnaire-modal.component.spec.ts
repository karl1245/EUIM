import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionnaireModalComponent } from './delete-questionnaire-modal.component';

describe('DeleteQuestionnaireModalComponent', () => {
  let component: DeleteQuestionnaireModalComponent;
  let fixture: ComponentFixture<DeleteQuestionnaireModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuestionnaireModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuestionnaireModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
