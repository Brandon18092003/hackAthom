import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo, Notificacion } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private apiUrl = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) {

   }

   getNotificationsByGrupo(idGrupo: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/group/${idGrupo}`);
  }

  crearAlerta(grupoId: number, mensaje: string): Observable<void> {
    const url = `${this.apiUrl}/api/grupos/${grupoId}/alertas`;
    return this.http.post<void>(url, mensaje);
  }
  
}
