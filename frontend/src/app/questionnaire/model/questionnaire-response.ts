export interface QuestionnaireResponse {

  id: number;
  name: string;
  validationAnswers: ValidationAnswer[];
}

export interface ValidationAnswer {

  id: number | null;
  rowId: number;
  answer: string;
  validationId: number;
  type: string;
  questionnaireId: number;
}

