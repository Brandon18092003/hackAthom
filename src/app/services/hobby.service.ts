import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hobby, EliminarHobbyDTO } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {
  private apiUrl = 'http://localhost:8080/api/hobby';

  constructor(private http: HttpClient) {}

  getHobbies(codigoPersona: string): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(`${this.apiUrl}/lista/${codigoPersona}`);
  }

  eliminarHobby(hobbyDTO: EliminarHobbyDTO): Observable<void> {
    console.log('Llamando a eliminar hobby con idPerfilHobby:', hobbyDTO.id_perfil_hobby);
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${hobbyDTO.id_perfil_hobby}`);
  }
}
