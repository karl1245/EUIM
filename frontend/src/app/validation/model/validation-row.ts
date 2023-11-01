import { ValidationAnswer } from '../../questionnaire/model/questionnaire-response';

export interface ValidationRow {
  answers: ValidationAnswer[];
  rowId: number;
}

