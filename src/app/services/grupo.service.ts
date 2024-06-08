// src/app/services/grupo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo, MiembroGrupo, CrearGrupoDTO, MiembroDTO, UpdateMiembroDTO } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private baseUrl = 'http://localhost:8080/api/grupo';

  constructor(private http: HttpClient) { }

  getGruposByCodPersona(codigo: string): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/lista/${codigo}`);
  }

  crearGrupo(grupoDTO: CrearGrupoDTO): Observable<Grupo> {
    return this.http.post<Grupo>(`${this.baseUrl}/crear`, grupoDTO);
  }

  agregarMiembro(miembroDTO: MiembroDTO): Observable<MiembroGrupo> {
    return this.http.post<MiembroGrupo>(`${this.baseUrl}/agregar/miembro/`, miembroDTO);
  }

  eliminarMiembro(miembroDTO: MiembroDTO): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/miembro`, { body: miembroDTO });
  }

  updateMiembro(updateMiembroDTO: UpdateMiembroDTO): Observable<MiembroGrupo> {
    return this.http.put<MiembroGrupo>(`${this.baseUrl}/update/miembro`, updateMiembroDTO);
  }
}
