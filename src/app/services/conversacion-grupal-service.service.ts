import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ConversacionGrupal, MensajeConversacionGrupal, MensajeRequest } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class ConversacionGrupalService {
  private apiUrl = 'http://localhost:8080/api/conversacion';
  private client: Client;
  private messages: Subject<MensajeConversacionGrupal> = new Subject<MensajeConversacionGrupal>();

  constructor(private http: HttpClient) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.client.subscribe('/topic/mensajes', e => {
        this.messages.next(JSON.parse(e.body));
      });
    };

    this.client.onDisconnect = (frame) => {
      console.log('Disconnected: ' + frame);
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  iniciarConversacion(grupoId: number): Observable<ConversacionGrupal> {
    return this.http.post<ConversacionGrupal>(`${this.apiUrl}/iniciar/${grupoId}`, {});
  }

  obtenerMensajes(conversacionId: number): Observable<MensajeConversacionGrupal[]> {
    return this.http.get<MensajeConversacionGrupal[]>(`${this.apiUrl}/mensajes/${conversacionId}`);
  }

  enviarMensajeRest(mensajeRequest: MensajeRequest): Observable<MensajeConversacionGrupal> {
    return this.http.post<MensajeConversacionGrupal>(`${this.apiUrl}/enviar`, mensajeRequest);
  }

  enviarMensajeWebSocket(mensajeRequest: MensajeRequest) {
    this.client.publish({
      destination: '/app/enviarMensaje',
      body: JSON.stringify(mensajeRequest),
    });
  }

  getMessages(): Observable<MensajeConversacionGrupal> {
    return this.messages.asObservable();
  }
}
