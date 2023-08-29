export interface ValidationRow {
  answers: ValidationAnswer[];
}

export interface ValidationAnswer {
  questionId: number;
  questionRowId: number;
  type: ValidationAnswerType;
  value: string;
}

export enum ValidationAnswerType {
  TEXT,
  AUTOFILL,
  SELECT
}
