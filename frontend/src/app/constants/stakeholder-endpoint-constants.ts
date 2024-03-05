export class StakeholderEndpointConstants {

  static API_ENDPOINT = 'api/';

  static rootUri(): string {
    return StakeholderEndpointConstants.API_ENDPOINT + 'stakeholder'
  }

  static getByQuestionnaireId(questionnaireId: number): string {
    return this.rootUri() + '/questionnaire-id/' + questionnaireId;
  }

  static deleteById(id: number): string {
    return this.rootUri() + '/' + id;
  }
}
