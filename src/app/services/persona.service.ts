// src/app/services/persona.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseUrl = 'http://localhost:8080/api/persona';

  constructor(private http: HttpClient) { }

  getPersonasByCurso(idCurso: number): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.baseUrl}/lista/${idCurso}`);
  }
}
