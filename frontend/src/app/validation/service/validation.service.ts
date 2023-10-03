import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationEndpointConstants } from '../../constants/validation-endpoint-constants';
import { Validation } from '../model/validation';
import { ValidationSummary } from '../model/validation-summary';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) {}

  public getValidations(): Observable<Validation[]> {
    return this.http.get<Validation[]>(
      ValidationEndpointConstants.getValidationUri()
    );
  }

  public getValidationSummaries(): Observable<ValidationSummary[]> {
    return this.http.get<ValidationSummary[]>(
      ValidationEndpointConstants.getValidationSummaryUri()
    );
  }

  public getValidationCombinationResults(): Observable<any> {
    return this.http.get<any[]>(
      ValidationEndpointConstants.getValidationCombinationResultUri()
    );
  }
}
