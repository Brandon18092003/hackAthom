import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private apiUrl = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) { }

  getNotificationsByGrupo(idGrupo: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/group/${idGrupo}`);
  }

  crearAlerta(grupoId: number, notificacion: Notificacion): Observable<void> {
    const url = `${this.apiUrl}/api/grupos/${grupoId}/alertas`;
    return this.http.post<void>(url, notificacion);
  }

  pinNotification(notificationId: number, isPinned: boolean): Observable<void> {
    const url = `${this.apiUrl}/pin/${notificationId}`;
    return this.http.post<void>(url, null, { params: { isPinned: String(isPinned) } });
  }

  getPinnedNotificationByGroup(idGrupo: number): Observable<Notificacion> {
    const url = `${this.apiUrl}/group/${idGrupo}/pinned`;
    return this.http.get<Notificacion>(url);
  }
}
