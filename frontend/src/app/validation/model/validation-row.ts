import { ValidationType } from './validation';

export interface ValidationRow {
  answers: ValidationAnswer[];
  questionRowId: number;
}

export interface ValidationAnswer {
  validationId: number;
  type: ValidationType;
  value: any;
}
