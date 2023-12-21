import { ValidationCombination } from './validation-combination';

export interface ValidationCombinationResult {
  id: number;
  resultEn: string;
  resultEt: string;
  validationCombinations: ValidationCombination[];
}
