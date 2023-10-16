export interface QuestionnaireResponse {

  id: number;
  name: string;
  validationAnswers: ValidationAnswer[];
}

export interface ValidationAnswer {

  id: number;
  rowId: number;
  answer: string;
} //TODO this doesnt sadly match what comes from back-end so probably should change in backend

