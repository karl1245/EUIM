import { ValidationValue } from './validation-value';
import { ValidationCombinationResult } from './validation-combination-result';

export interface ValidationCombination { //TODO rename api objects to responses'

  id: number;
  validationValue: ValidationValue,
  validationResponse: ValidationCombinationResult
}
