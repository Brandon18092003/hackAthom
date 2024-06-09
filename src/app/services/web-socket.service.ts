import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';
import { MensajeConversacionGrupal, MensajeRequest } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private messages: Subject<MensajeConversacionGrupal> = new Subject<MensajeConversacionGrupal>();
  private currentSubscription: any;
  private connectionPromise: Promise<void>;

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

    this.connectionPromise = new Promise<void>((resolve, reject) => {
      this.client.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        resolve();
      };

      this.client.onDisconnect = (frame) => {
        console.log('Disconnected: ' + frame);
        reject('Disconnected');
      };

      this.client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        reject(frame.headers['message']);
      };

      this.client.activate();
    });
  }

  subscribeToGroupMessages(conversacionId: number) {
    this.connectionPromise.then(() => {
      if (this.currentSubscription) {
        this.currentSubscription.unsubscribe();
        console.log(`Unsubscribed from topic: /topic/mensajes/${conversacionId}`);
      }

      this.currentSubscription = this.client.subscribe(`/topic/mensajes/${conversacionId}`, (message: Message) => {
        const parsedMessage = JSON.parse(message.body);
        if (parsedMessage && parsedMessage.id) {
          this.messages.next(parsedMessage);
        } else {
          console.error('Invalid message structure', parsedMessage);
        }
      });

      console.log(`Subscribed to topic: /topic/mensajes/${conversacionId}`);
    }).catch(error => {
      console.error('Failed to subscribe:', error);
    });
  }

  sendMessage(mensajeRequest: MensajeRequest) {
    this.connectionPromise.then(() => {
      this.client.publish({
        destination: '/app/enviarMensaje',
        body: JSON.stringify(mensajeRequest),
      });
      console.log(`Message sent to /app/enviarMensaje for conversacionId: ${mensajeRequest.conversacionId}`);
    }).catch(error => {
      console.error('Failed to send message:', error);
    });
  }

  getMessages(): Observable<MensajeConversacionGrupal> {
    return this.messages.asObservable();
  }
}
