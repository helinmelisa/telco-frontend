import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
   controllerUrl = `${environment.apiUrl}auth/login`;
   constructor(private http: HttpClient){}

   login(userName: string, password:string){
    console.log(userName);
    console.log(password);
    return this.http.post<User>(this.controllerUrl,{userName,password})
    .subscribe((res:any) => {
      localStorage.setItem('access_token',res.access_token)
    });
   }

   getToken() {
    return localStorage.getItem('access_token');
   }

   isLoggedIn(): boolean {
       let authToken = localStorage.getItem('access_token');
       return authToken !== null ? true : false;
   }


}

  // isUserLoggedIn: boolean = false;

  // login(userName: string, password: string): Observable<any> {
  //    console.log(userName);
  //    console.log(password);
  //    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
  //    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 

  // return of(this.isUserLoggedIn).pipe(
  //    delay(1000),
  //    tap(val => { 
  //       console.log("Is User Authentication is successful: " + val); 
  //    })
  // );


  // logout(): void {
  // this.isUserLoggedIn = false;
  //    localStorage.removeItem('isUserLoggedIn'); 
  // }

// export class AuthService {
//   controllerUrl = `${environment.apiUrl}auth/login`;
//   constructor(private http: HttpClient) { 
//   }

//   login(user: User) {
//     return this.http.post<User>(this.controllerUrl,user)
//     .subscribe((res: any) => {
//       localStorage.setItem('access_token',res.access_token);
//     });
//   }

//     getToken() {
//       return localStorage.getItem('access_token');
//     }

//     isLoggedIn(): boolean {
//       let authToken = localStorage.getItem('access_token');
//       return authToken !== null ? true : false;
//     }
// }

