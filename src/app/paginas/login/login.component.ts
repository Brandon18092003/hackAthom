// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  usernameTouched: boolean = false;
  passwordTouched: boolean = false;

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('#contrasena') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
      const togglePassword = document.querySelector('#toggle-password') as HTMLElement;
      if (togglePassword) {
        togglePassword.textContent = this.showPassword ? '🙈' : '👁️';
      }
    }
  }

  validateForm(): void {
    this.usernameTouched = true;
    this.passwordTouched = true;
  }

  onSubmit(): void {
    if (this.username && this.password) {
      // Simulate login process
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      // Navigate to the dashboard component
      this.router.navigate(['/index']);
    }
  }
}
