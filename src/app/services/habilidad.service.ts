import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  crearHabilidad(habilidad: CrearHabilidadDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, habilidad);
  }

  eliminarHabilidad(habilidadDTO: EliminarHabilidadDTO): Observable<void> {
    console.log('Llamando a eliminar habilidad con idPerfilHabilidad:', habilidadDTO.id_perfil_habilidad);
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${habilidadDTO.id_perfil_habilidad}`);
  }
}
