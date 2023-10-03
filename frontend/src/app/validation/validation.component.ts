import { Component, Input, OnInit } from '@angular/core';
import { ValidationService } from './service/validation.service';
import { Validation, ValidationType } from './model/validation';
import { ValidationAnswer, ValidationRow } from './model/validation-row';
import { ValidationCombinationResult } from './model/validation-combination-result';
import { Observable } from 'rxjs';
import { ValidationValue, ValidationValue2LabelMapping } from './model/validation-value';
import { ValidationSummary } from './model/validation-summary';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit{

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
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
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
        //TODO get current project row data
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

  getValidationAnswers(): void { //TODO get from backend
    let validationRow: ValidationAnswer[] = [];
    this.validations.forEach( v => {
        if (this.validationIdsHavingSelections.includes(v.id)) {
          if (v.id === 1) {
            validationRow.push({validationId: v.id, value: 'YES', type: ValidationType.SELECT})
          }
          validationRow.push({ value: null, validationId: v.id, type: ValidationType.SELECT})
        } else {
          validationRow.push({validationId: v.id, value: 'value for: ' + v.nameEn, type: ValidationType.TEXT})
        }
      }
    );
    this.validationRowValues.push({answers: validationRow, questionRowId: 1});
    console.log(this.validationRowValues)
    if (this.validationRowValues.length == 0) { //TODO do this when new project
      this.addValidationRow();
    }
  }

  addValidationRow(): void {
    let validationRow: ValidationAnswer[] = [];
    const maxRowId = this.validationRowValues.reduce(function(prev, current) {
      return (prev.questionRowId > current.questionRowId) ? prev : current
    }).questionRowId;

    this.validations.forEach( v => {
      validationRow.push({validationId: v.id, value: '', type: v.type})
      }
    );
    this.validationRowValues.push({answers: validationRow, questionRowId: maxRowId + 1});
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
      validationRowAnswer.value = eventValue;
      this.updateRelatedValidationAnswers(validation, validationRowValue);
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
          value: answer.value,
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
      answerToFill.value = this.getAnswerToSet(answerValuesSortedByWeight);
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
      if (answer == null || answer.value == '' || answer.value == null) {
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
          correctAnswer.value = combinationResult.resultEn;
          this.updateRelatedValidationAnswers(validationFilledByAnswer, validationRowValue);
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
}
