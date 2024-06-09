import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/curso';

  constructor(private http: HttpClient) { }

  getCursosByCod(codigo: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/lista/${codigo}`);
  }
  
}
