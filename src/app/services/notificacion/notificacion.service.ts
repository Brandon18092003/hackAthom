import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Notificacion, NotificacionDTO } from '../../models/model';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  //Variables websocket
  private stompClient: any;
  private subscriptions: { [roomId: string]: Subscription } = {};
  private connectionPromise: Promise<void>;

  private apiUrl = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) { 
    this.connectionPromise = this.initConnectionSocket();
  }

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

  //Notificacion web socket
  private async initConnectionSocket(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const url = 'http://localhost:8080/ws';
      const socket = new SockJS(url);
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, () => {
        console.log('WebSocket connection established');
        resolve();
      }, (error:string) => {
        console.error('Error al conectar WebSocket:', error);
        reject(error);
      });
    });
  }

  async joinRoom(roomId: number) {
    await this.connectionPromise;

    if (this.subscriptions[roomId]) {
      // Ya está suscrito a este grupo
      return;
    }

    const subscription = this.stompClient.subscribe(`/topic/${roomId}`, (notifys: any) => {
      const notifyContent = JSON.parse(notifys.body);
      console.log(notifyContent);
      this.notificationSubject.next(notifyContent);
    });

    this.subscriptions[roomId] = subscription;
  }

  async leaveRoom(roomId: string) {
    await this.connectionPromise;

    const subscription = this.subscriptions[roomId];
    if (subscription) {
      subscription.unsubscribe();
      delete this.subscriptions[roomId];
    }
  }

  async sendNotify(roomIds: number[], notifyMessage: NotificacionDTO) {
    await this.connectionPromise;

    roomIds.forEach(roomId => {
      this.stompClient.send(`/app/notificacion/${roomId}`, {}, JSON.stringify(notifyMessage));
    });
  }

  // Notificar a otro componente
  private notificationSubject = new Subject<NotificacionDTO>();
  notification$ = this.notificationSubject.asObservable();

  
  private notificationsSubject = new BehaviorSubject<NotificacionDTO[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  addNotification(notification: NotificacionDTO) {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);
  }
}


