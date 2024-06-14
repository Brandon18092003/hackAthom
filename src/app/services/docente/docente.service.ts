import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso, Grupo } from '../../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = 'http://localhost:8080/api/docente';


  constructor(private http:HttpClient) { }

  getCursosByDocente(codigo: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/cursos/${codigo}`);
  }

  getGruposByCursoDocente(codigo: string,idCurso: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.apiUrl}/curso/grupos/${codigo}/${idCurso}`);
  }




}
