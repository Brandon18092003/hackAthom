import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../../models/model';
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

}
