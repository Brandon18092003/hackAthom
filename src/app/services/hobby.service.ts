import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hobby, EliminarHobbyDTO, CrearHobbyDTO } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {
  private apiUrl = 'http://localhost:8080/api/hobby';

  constructor(private http: HttpClient) {}

  getHobbies(codigoPersona: string): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(`${this.apiUrl}/lista/${codigoPersona}`);
  }

  crearHobby(hobby: CrearHobbyDTO): Observable<Hobby> {
    return this.http.post<Hobby>(`${this.apiUrl}/crear/${hobby.codigoPersona}`, hobby);
  }

  eliminarHobby(hobbyDTO: EliminarHobbyDTO): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar`, {
      body: hobbyDTO,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
