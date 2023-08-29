import { ValidationCombination } from './validation-combination';

export interface ValidationCombinationResult { //TODO rename api objects to responses
  id: number;
  resultEn: string;
  resultEt: string;
  validationCombinations: ValidationCombination[];
}
