import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearHobbyDTO, Hobby, EliminarHobbyDTO } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {
  private apiUrl = 'http://localhost:8080/api/hobby';

  constructor(private http: HttpClient) {}

  getHobbies(codigo: string): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(`${this.apiUrl}/lista/${codigo}`);
  }

  crearHobby(codigo: string, hobby: CrearHobbyDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear/${codigo}`, hobby);
  }

  eliminarHobby(hobbyDTO: EliminarHobbyDTO): Observable<void> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: hobbyDTO
    };
    return this.http.delete<void>(`${this.apiUrl}/eliminar`, options);
  }
}
