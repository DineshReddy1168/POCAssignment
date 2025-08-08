import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  errorMsg = '';
  successMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.successMsg = 'Registration successful. Redirecting to login...';
        this.errorMsg = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);  // Redirect after 2 sec
      },
      error: (err) => {
        // Try to get meaningful message
        this.errorMsg = err.error?.message || err.error || 'Registration failed.';
        this.successMsg = '';
      },
    });
  }
}
