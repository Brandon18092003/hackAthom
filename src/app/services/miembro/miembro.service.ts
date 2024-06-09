import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearGrupoDTO, Grupo } from '../../models/model';
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

  
}
