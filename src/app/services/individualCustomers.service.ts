import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class IndividualCustomersService {
  private controllerUrl = `${environment.apiUrl}/individualCustomers`;
  constructor(private httpClient: HttpClient) {}

  getIndividualCustomers(): Observable<IndividualCustomers[]> {
    return this.httpClient.get<IndividualCustomers[]>(this.controllerUrl);
  }

  update(individualCustomers: IndividualCustomers): Observable<IndividualCustomers> {
    return this.httpClient.put<IndividualCustomers>(
      `${this.controllerUrl}/${individualCustomers.customerId}`,
      individualCustomers
    );
  }

  delete(customerId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${customerId}`);
  }
}
