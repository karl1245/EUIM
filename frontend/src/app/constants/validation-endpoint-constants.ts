
export class ValidationEndpointConstants {

  static API_ENDPOINT = 'api/';

  static getValidationUri(): string {
    return ValidationEndpointConstants.API_ENDPOINT + 'validation'
  }

  static getValidationSummaryUri(): string {
    return ValidationEndpointConstants.API_ENDPOINT + 'validation-summary'
  }

  static getValidationCombinationResultUri(): string {
    return ValidationEndpointConstants.API_ENDPOINT + 'validation-combination-result'
  }
}
