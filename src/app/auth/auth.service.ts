import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
  const token = localStorage.getItem(this.tokenKey);
  console.log('Token fetched from storage:', token); 
  return token;
}

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
  this.clearToken();
  window.location.href = '/login'; // force page reload to clear state
}


  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', user);
  }
}
