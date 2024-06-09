import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseUrl = 'http://localhost:8080/api/grupo'; // Ajusta la URL base de tu backend

  constructor(private http: HttpClient) { }

  getGruposByCodPersona(codigo: string): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/lista/${codigo}`);
  }
}