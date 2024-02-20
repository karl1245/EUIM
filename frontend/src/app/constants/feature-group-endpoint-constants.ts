export class FeatureGroupEndpointConstants {

  static API_ENDPOINT = 'api/';

  static rootUri(): string {
    return FeatureGroupEndpointConstants.API_ENDPOINT + 'feature-group'
  }

  static getByQuestionnaireId(questionnaireId: number): string {
    return this.rootUri() + '/questionnaire-id/' + questionnaireId;
  }

  static deleteById(id: number): string {
    return this.rootUri() + '/' + id;
  }
}
