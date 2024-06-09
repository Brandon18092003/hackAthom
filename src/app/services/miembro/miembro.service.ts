import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearGrupoDTO, Grupo, MiembroDTO, MiembroGrupo, UpdateMiembroDTO } from '../../models/model';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {

  private apiUrl = 'http://localhost:8080/api/grupo';


  constructor(private http: HttpClient) { }

  crearGrupo(grupoDTO: CrearGrupoDTO): Observable<Grupo> {
    return this.http.post<Grupo>(`${this.apiUrl}/crear`, grupoDTO)
      .pipe(
        catchError(error => {
          console.error('Error al crear grupo:', error);
          throw error; // Re-lanza el error para que el componente lo maneje
        })
      );
  }

  updateMiembro(updateMiembroDTO: UpdateMiembroDTO): Observable<MiembroGrupo> {
    return this.http.put<MiembroGrupo>(`${this.apiUrl}/update/miembro`, updateMiembroDTO)
  }

  deleteMiembro(miembroDTO: MiembroDTO) {
    return this.http.delete(`${this.apiUrl}/eliminar/miembro`, { body: miembroDTO });
  }

  agregarMiembroAlGrupo(miembroDTO: MiembroDTO): Observable<MiembroGrupo> {
    return this.http.post<MiembroGrupo>(`${this.apiUrl}/agregar/miembro`, miembroDTO)
  }
  
}
