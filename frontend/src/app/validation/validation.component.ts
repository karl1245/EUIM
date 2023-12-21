import { Component, Input, OnInit } from '@angular/core';
import { ValidationService } from './service/validation.service';
import { Validation, ValidationType } from './model/validation';
import { ValidationRow } from './model/validation-row';
import { ValidationCombinationResult } from './model/validation-combination-result';
import { firstValueFrom, Observable } from 'rxjs';
import { ValidationValue, ValidationValue2LabelMapping } from './model/validation-value';
import { ValidationSummary } from './model/validation-summary';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationAnswer } from '../questionnaire/model/questionnaire-response';
import { TranslateService } from '@ngx-translate/core';
import { GlobalConstants } from '../constants/global-constants';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit{

  private TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE = 400;
  questionnaireId: number;
  loading: boolean = true;
  translate: boolean = false;
  validationIdsHavingSelections: number[] = [];
  validationIdsHavingTextFields: number[] = [];
  validationIdsHavingAutoFill: number[] = [];
  validations: Validation[] = [];
  validationSummaries: ValidationSummary[] = [];
  validationRowValues: ValidationRow[] = [];
  validationCombinationResults: ValidationCombinationResult[] = [];
  validationValue2LabelMapping = ValidationValue2LabelMapping;
  validationValues = Object.values(ValidationValue);

  @Input() columns: string[] = [];


  constructor(
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
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
    const finished = new Observable(subscriber => {
      this.getValidations(subscriber)
      this.getValidationSummaries(subscriber)
      this.getValidationCombinationResults(subscriber);
    })
    finished.subscribe(_ => {
      if (
        this.validations.length > 0 &&
        this.validationCombinationResults.length > 0 &&
        this.validationSummaries.length > 0
      ) {
        this.getValidationAnswers();
        this.loading = false;
      }
    })
  }

  getValidations(subscriber: any): void {
    this.validationService
      .getValidations()
      .subscribe((next) => {
        this.validations = next.sort((a,b) => a.weight - b.weight);
        this.validations.forEach(v => {
          if (v.type === ValidationType.SELECT) {
            this.validationIdsHavingSelections.push(v.id);
          } else if (v.type === ValidationType.FILL) {
            this.validationIdsHavingAutoFill.push(v.id);
          } else if (v.type === ValidationType.TEXT) {
            this.validationIdsHavingTextFields.push(v.id);
          }
        });
        this.validationIdsHavingTextFields.push()
        subscriber.next(this.validations);
      });
  }
  getValidationSummaries(subscriber: any): void {
    this.validationService
      .getValidationSummaries()
      .subscribe((next) => {
        this.validationSummaries = next.sort((a,b) => a.weight - b.weight);
        subscriber.next(this.validationSummaries);
      });
  }

  getValidationCombinationResults(subscriber: any): void {
    this.validationService.getValidationCombinationResults().subscribe((next) => {
      this.validationCombinationResults = next
      subscriber.next(this.validationCombinationResults);
    });
  }

  getValidationAnswers(): void {
    this.validationService.getValidationAnswersByQuestionnaireId(this.questionnaireId).subscribe(
      next => {
        if (next.length === 0) {
          this.addValidationRow();
        } else {
          this.validationRowValues = this.mapValidationAnswersToRows(next);
        }
      }
    );
    this.loading = false;
  }


  mapValidationAnswersToRows(validationAnswers: ValidationAnswer[]) {
    const result: { rowId: number; answers: ValidationAnswer[]; }[] = [];
    for (const validationAnswer of validationAnswers) {
      const existingRow = result.find(va => va.rowId === validationAnswer.rowId);
      if (existingRow) {
        existingRow.answers.push(validationAnswer)
        continue;
      }
      result.push({rowId: validationAnswer.rowId, answers: [validationAnswer]})
    }

    return result;
  }


  async addValidationRow() {
    let validationRow: ValidationAnswer[] = [];
    let maxRowId = 0;
    if (this.validationRowValues.length > 0) {
      maxRowId = this.validationRowValues.reduce(function(prev, current) {
        return (prev.rowId > current.rowId) ? prev : current
      }).rowId;
    }

    for (const v of this.validations) {
      const answer = await firstValueFrom(
        this.validationService.saveValidationAnswer({
        id: null,
        rowId: maxRowId + 1,
        validationId: v.id,
        answer: '', type:
        v.type,
        questionnaireId:
        this.questionnaireId
        })
      );
      validationRow.push(answer);
    }
    this.validationRowValues.push({answers: validationRow, rowId: maxRowId + 1});
  }

  getValidationRowAnswer(validation: Validation, validationRowValue: ValidationRow) {
    return validationRowValue.answers.filter(answer => answer.validationId === validation.id)[0];
  }

  isValidationSelectable(validation: Validation): boolean {
    return this.validationIdsHavingSelections.includes(validation.id);
  }

  isValidationTextField(validation: Validation): boolean {
    return this.validationIdsHavingTextFields.includes(validation.id);
  }

  isValidationAutofill(validation: Validation): boolean {
    return this.validationIdsHavingAutoFill.includes(validation.id);
  }

  onValidationRowValueChange(eventValue: any, validationRowAnswer: ValidationAnswer, validation: Validation, validationRowValue: ValidationRow) {
      validationRowAnswer.answer = eventValue;
    setTimeout(() => {
      this.validationService.saveValidationAnswer(validationRowAnswer).subscribe(
        next => this.updateRelatedValidationAnswers(validation, validationRowValue)
      );
    }, this.TIMEOUT_BEFORE_SENDING_ANSWER_UPDATE)
  }

  updateRelatedValidationAnswers(validation: Validation, validationRowValue: ValidationRow): void {
    const validationsFilledByAnswer = this.validations.filter(foundValidation =>
      foundValidation.validationAutofillList.some(autofill =>
        autofill.validationFilledById !== null && autofill.validationFilledById === validation.id
      )
    );

    for (let validationFilledByAnswer of validationsFilledByAnswer) {
      if (validationFilledByAnswer) {
        this.setAutoFillAnswers(validationFilledByAnswer, validationRowValue);
      }
    }
  }

  private setAutoFillAnswers(validationFilledByAnswer: Validation, validationRowValue: ValidationRow) {
    if (!this.allRequiredAnswersFilled(validationFilledByAnswer, validationRowValue)) {
      return;
    }

    const answerValues = []
    let isAutofillTypeCombination = true;
    let isAutoFillFromSelect = true;
    for (let validationFilledBy of validationFilledByAnswer.validationAutofillList) {
      if (validationFilledBy.type !== 'COMBINATION') {
        isAutofillTypeCombination = false;
      }
      const answer = validationRowValue.answers.find(a => a.validationId === validationFilledBy.validationFilledById);
      if (answer != null) {
        if (answer.type !== 'SELECT') {
          isAutoFillFromSelect = false;
        }
        answerValues.push({
          validationId: answer.validationId,
          value: answer.answer,
          weight: validationFilledBy.weight,
          hasMatch: false
        })
      }
    }

    const answerValuesSortedByWeight = answerValues.sort(({ weight: a }, { weight: b }) => a - b);

    if (isAutofillTypeCombination && isAutoFillFromSelect) {
      this.updateCombinationAutoFillAnswers(answerValuesSortedByWeight, validationRowValue, validationFilledByAnswer);

      return;
    }

    const answerToFill = validationRowValue.answers.find(a => a.validationId === validationFilledByAnswer.id);
    if (answerToFill) {
      answerToFill.answer = this.getAnswerToSet(answerValuesSortedByWeight);
      this.validationService.saveValidationAnswer(answerToFill).subscribe(next => {});
    }
  }

   getAnswerToSet(answerValuesSortedByWeight: any[]) {
    if (answerValuesSortedByWeight.length > 0) {
      let combinationAnswer = '';
      for (let answerValueSortedByWeight of answerValuesSortedByWeight) {
        combinationAnswer += ' ' + answerValueSortedByWeight.value;
      }
      return combinationAnswer;
    }

    return answerValuesSortedByWeight[0].value
  }

  allRequiredAnswersFilled(validationFilledByAnswer: Validation, validationRowValue: ValidationRow): boolean {
    for (let validationFilledBy of validationFilledByAnswer.validationAutofillList) {
      const answer = validationRowValue.answers.find(a => a.validationId === validationFilledBy.validationFilledById);
      if (answer == null || answer.answer == '' || answer.answer == null) {
        return false;
      }
    }

    return true;
  }

  updateCombinationAutoFillAnswers(answerValuesSortedByWeight: any[], validationRowValue: ValidationRow, validationFilledByAnswer: Validation) {
    for (let combinationResult of this.validationCombinationResults) {
      if (this.hasMatchingCombination(combinationResult, answerValuesSortedByWeight)) {
        const correctAnswer = validationRowValue.answers.find(a => a.validationId === validationFilledByAnswer.id);
        if (correctAnswer) {
          correctAnswer.answer = this.getTranslation(combinationResult);
          this.validationService.saveValidationAnswer(correctAnswer).subscribe(next => {
            this.updateRelatedValidationAnswers(validationFilledByAnswer, validationRowValue);
          });
        }
        return;
      }
    }
  }

  hasMatchingCombination(combinationResult: ValidationCombinationResult, answerValuesSortedByWeight: any[]) {
    for (let combination of combinationResult.validationCombinations) {
      const foundAnswer = answerValuesSortedByWeight.find(av => av.validationId == combination.validationResponse.id && av.value == combination.validationValue);
      if (foundAnswer) {
        foundAnswer.hasMatch = true;
      }
    }
    let hasMatch = true;
    for (let answerValue of answerValuesSortedByWeight) {
      if (!answerValue.hasMatch) {
        hasMatch = false;
      }
    }
    return hasMatch;
  }

  deleteRow(rowId: number) {
    this.validationService.deleteValidationAnswersByQuestionnaireIdAndRowId(this.questionnaireId, rowId).subscribe(
      next => this.validationRowValues = this.validationRowValues.filter(vrv => vrv.rowId !== rowId)
    );
  }

  getTranslation(value: any): string {
    if (this.isCurrentLangEt) {
      return value.nameEt ? value.nameEt : value.resultEt;
    }

    return value.nameEn ? value.nameEn : value.resultEn;
  }

  get isCurrentLangEt(): boolean {
    return this.translateService.currentLang === GlobalConstants.ET;
  }

}
