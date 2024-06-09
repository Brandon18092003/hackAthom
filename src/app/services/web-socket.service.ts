import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { MensajeConversacionGrupal, MensajeRequest } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private messages: Subject<MensajeConversacionGrupal> = new Subject<MensajeConversacionGrupal>();

  constructor() {
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

  sendMessage(mensajeRequest: MensajeRequest) {
    this.client.publish({
      destination: '/app/enviarMensaje',
      body: JSON.stringify(mensajeRequest),
    });
  }

  getMessages() {
    return this.messages.asObservable();
  }
}