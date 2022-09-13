import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = "http://localhost:8085/"
  constructor(private router: Router, private http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    return this.http.post(this.url + "User/Access/login",
      {
        username: email, password: password
      }
    );
  }

  resetPassword(email: any) {
    return this.http.post(this.url + "User/Access/forgot/" + email, {})
  }
}
