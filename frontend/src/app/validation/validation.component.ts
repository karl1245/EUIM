import { Component, Input, OnInit } from '@angular/core';
import { ValidationService } from './service/validation.service';
import { Validation } from './model/validation';
import { ValidationAnswer, ValidationAnswerType, ValidationRow } from './model/validation-row';
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
        console.log("tehtud")
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
        console.log("finished getValidations")
        subscriber.next(this.validations);
        console.log("finished getValidations after subscriber next")
        //this.columns = this.validations.map(validation => validation.nameEn); //Todo translation
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
      this.validationCombinationResults[0].validationCombinations.forEach(vc => this.validationIdsHavingSelections.push(vc.id));
      console.log("ids for selections: " + this.validationIdsHavingSelections);
      console.log(this.validationCombinationResults)
      console.log("finished getValidationCombinationResults")
      subscriber.next(this.validationCombinationResults);
      console.log("finished getValidationCombinationResults after subscriber")
    });
  }

  getValidationAnswers(): void { //TODO get from backend
    let validationRow: ValidationAnswer[] = [];
    this.validations.forEach( v => {
        if (this.validationIdsHavingSelections.includes(v.id)) {
          if (v.id === 1) {
            validationRow.push({questionId: v.id, value: 'YES', questionRowId: 1, type: ValidationAnswerType.SELECT})
          }
          validationRow.push({questionId: v.id, value: 'select value for: ' + v.nameEn, questionRowId: 1, type: ValidationAnswerType.SELECT})
        } else {
          validationRow.push({questionId: v.id, value: 'value for: ' + v.nameEn, questionRowId: 1, type: ValidationAnswerType.TEXT})
        }
      }
    );
    this.validationRowValues.push({answers: validationRow});
    console.log(this.validationRowValues)
    //subscriber.next(this.validations)
  }

  getValidationRowAnswer(validation: Validation, validationRowValue: ValidationRow) {
    return validationRowValue.answers.filter(answer => answer.questionId === validation.id)[0];
  }

  isValidationSelectable(validation: Validation): boolean {
    return this.validationIdsHavingSelections.includes(validation.id);
  }

  onValidationRowValueChange(event: any, validationRowAnswer: ValidationAnswer) {
      validationRowAnswer.value = event.value;
  }
}
