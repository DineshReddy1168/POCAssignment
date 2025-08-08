import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = {
    usernameOrEmail: '',
    password: '',
  };

  errorMsg = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

 login(): void {
  this.http
    .post<{ token: string }>('http://localhost:8080/api/auth/login', this.credentials)  
    .subscribe({
      next: (res) => {
        console.log('Login Response:', res);
        if (res.token) {
          this.authService.setToken(res.token);
          this.router.navigate(['/books']);
        } else {
          this.errorMsg = 'Login failed: No token received.';
        }
      },
      error: () => {
        this.errorMsg = 'Login failed. Please check your credentials.';
      },
    });
}

}
