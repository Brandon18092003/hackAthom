import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { CredsDTO } from '../models/model';

interface LoginResponse {
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/login';  // URL de la API de autenticación

  constructor(private http: HttpClient) { }

  login(creds: CredsDTO): Observable<string> {

    return this.http.post<LoginResponse>(this.apiUrl, creds)
      .pipe(
        map(response => {
          localStorage.setItem('codUsuario', creds.codUsuario);
          localStorage.setItem('rol', response.rol);
          return response.rol

        }),
        catchError(error => {
          throw new Error('Invalid credentials');
        })
      );
  }

    // Método para obtener el username desde el localStorage
    getCodigo(): string | null {
      return localStorage.getItem('codUsuario');
    }
  
    // Método para obtener el rol desde el localStorage
    getRol(): string | null {
      return localStorage.getItem('rol');
    }
}
