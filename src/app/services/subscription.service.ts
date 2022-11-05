import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private controllerUrl = `${environment.apiUrl}/subscription`;

  constructor(private httpClient: HttpClient) { }

  
  getSubscription(customerId:number): Observable<Subscription[]>{
    return this.httpClient.get<Subscription[]>(`${this.controllerUrl}?customerId=${customerId}`)
  }
}
