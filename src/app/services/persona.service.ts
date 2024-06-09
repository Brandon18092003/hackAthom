import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'http://localhost:8080/api/persona';

  constructor(private http: HttpClient) { }

  getRolUsuarioEnGrupo(idGrupo: number, codigoUsuario: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/rol/${idGrupo}/${codigoUsuario}`);
  }
}
