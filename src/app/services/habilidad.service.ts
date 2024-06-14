import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearHabilidadDTO, Habilidad, EliminarHabilidadDTO } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  private apiUrl = 'http://localhost:8080/api/habilidad';

  constructor(private http: HttpClient) {}

  getHabilidades(codigo: string): Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>(`${this.apiUrl}/lista/${codigo}`);
  }

  crearHabilidad(habilidad: CrearHabilidadDTO): Observable<Habilidad> {
    return this.http.post<Habilidad>(`${this.apiUrl}/crear/${habilidad.codigoPersona}`, habilidad);
  }

  eliminarHabilidad(habilidadDTO: EliminarHabilidadDTO): Observable<void> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: habilidadDTO
    };
    return this.http.delete<void>(`${this.apiUrl}/eliminar`, options);
  }
}
