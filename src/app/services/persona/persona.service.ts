import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona, PersonaDTO } from '../../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'http://localhost:8080/api/persona';

  constructor(private http: HttpClient) { }

  getPersonasByCurso(idCurso: number): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/lista/cursos/${idCurso}`);
  }

  getPersonasByGrupo(idGrupo: number): Observable<PersonaDTO[]> {
    return this.http.get<PersonaDTO[]>(`${this.apiUrl}/lista/grupos/${idGrupo}`);
  }

  getRolUsuarioEnGrupo(idGrupo: number, codigoUsuario: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/rol/${idGrupo}/${codigoUsuario}`);
  }


}
