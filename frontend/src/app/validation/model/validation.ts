export interface Validation {

  id: number;
  nameEt: string;
  nameEn: string;
  weight: number;
  type: ValidationType;
  summaryId: number;
}

export enum ValidationType {
  SELECT = "SELECT",
  FILL = "FILL",
  TEXT = "TEXT"
}
