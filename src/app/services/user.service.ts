import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  private controllerUrl = `${environment.apiUrl}/individualCustomers`;
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.controllerUrl);
  }

  update(users: Users): Observable<Users> {
    return this.httpClient.put<Users>(
      `${this.controllerUrl}/${users.customerId}`,
      users
    );
  }

  delete(customerId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${customerId}`);
  }
}
