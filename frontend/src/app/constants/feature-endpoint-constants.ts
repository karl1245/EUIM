export class FeatureEndpointConstants {
  static API_ENDPOINT = 'api/';

  static rootUri(): string {
    return FeatureEndpointConstants.API_ENDPOINT + 'feature'
  }

  static idPath(id: number): string {
    return this.rootUri() + '/' + id
  }
}
