import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionnaireModalComponent } from './edit-questionnaire-name-modal';

describe('EditQuestionnaireModalComponent', () => {
  let component: EditQuestionnaireModalComponent;
  let fixture: ComponentFixture<EditQuestionnaireModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionnaireModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestionnaireModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
