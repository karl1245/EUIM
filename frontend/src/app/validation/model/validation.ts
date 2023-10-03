export interface Validation {

  id: number;
  nameEt: string;
  nameEn: string;
  weight: number;
  type: ValidationType;
  summaryId: number;
  validationAutofillList: ValidationAutofill[];
}
export interface ValidationAutofill {

  validationFilledById: number;
  weight: number;
  placeholder: string;
  type: string;
}


export enum ValidationType {
  SELECT = "SELECT",
  FILL = "FILL",
  TEXT = "TEXT"
}
