import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private baseUrl = 'http://localhost:8080/api/curso';

  constructor(private http: HttpClient) { }

  getCursosByCodigo(codigo: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/lista/${codigo}`);
  }
}