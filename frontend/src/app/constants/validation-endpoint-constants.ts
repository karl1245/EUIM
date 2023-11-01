
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

  static getValidationAnswersUri(): string {
    return ValidationEndpointConstants.API_ENDPOINT + 'validation-answer'
  }

  static getValidationAnswersByQuestionnaireIdUri(questionnaireId: number): string {
    return this.getValidationAnswersUri() + '/questionnaire-id/' + questionnaireId;
  }

  static deleteValidationAnswersByQuestionnaireIdUriAndRowId(questionnaireId: number, rowId: number): string {
    return this.getValidationAnswersByQuestionnaireIdUri(questionnaireId) + '/row-id/' + rowId;
  }
}
