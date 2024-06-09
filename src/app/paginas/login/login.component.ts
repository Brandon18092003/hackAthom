// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredsDTO } from '../../models/model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  creds: CredsDTO ={
    codUsuario:'',
    password:''
  };
  errorMessage: string='';

  showPassword: boolean = false;
  usernameTouched: boolean = false;
  passwordTouched: boolean = false;

  constructor(private router: Router, private authService:AuthService) {}

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

  login(form: NgForm): void {

    if(this.creds){
      console.log(this.creds);
      this.authService.login(this.creds).subscribe({
        next:(rol) =>{
          console.log("Logueado con rol "+rol);
          //Redirige a Index
          this.router.navigate(['/index']);
        },
        error:(err) =>{
          this.errorMessage = err.message;
          Swal.fire("Credenciales incorrectas")
        }
      })
    }
  }
}
