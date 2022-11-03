import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Services } from '../models/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ServicesService {
  private controllerUrl = `${environment.apiUrl}/services`;
  constructor(private httpClient: HttpClient) {}

  getServices(): Observable<Services[]> {
    return this.httpClient.get<Services[]>(this.controllerUrl);
  }

  update(services: Services): Observable<Services> {
    return this.httpClient.put<Services>(
      `${this.controllerUrl}/${services.id}`,
      services
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }
}
