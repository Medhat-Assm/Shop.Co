import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  userData = new BehaviorSubject(null);

  setUserData() {
    // Encoding token ==> JSON , and make it shared
    this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
  }

  signUp(userData: User): Observable<any> {
    return this.httpClient
      .post(`${environment.baseUrl}auth/signup`, userData)
      .pipe(tap((res) => console.log(res)));
  }

  signIn(userData: User): Observable<any> {
    return this.httpClient
      .post(`${environment.baseUrl}auth/signin`, userData)
      .pipe(tap((res) => console.log(res)));
  }

  verifyToken(): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}auth/verifyToken`)
      .pipe(tap((res) => console.log(res)));
  }
}
