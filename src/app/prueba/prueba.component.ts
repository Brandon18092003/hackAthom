import { Component, OnInit } from '@angular/core';
import { ConversacionGrupalService } from '../services/conversacion-grupal-service.service';
import { ConversacionGrupal, MensajeConversacionGrupal, MensajeRequest } from '../../model';
import { WebSocketService } from '../services/web-socket-service.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent implements OnInit {
    conversacion: ConversacionGrupal | null = null;
    mensajes: MensajeConversacionGrupal[] = [];
  
    constructor(
      private conversacionGrupalService: ConversacionGrupalService,
      private webSocketService: WebSocketService
    ) { }
  
    ngOnInit() {
      this.iniciarConversacion(1);
      this.webSocketService.getMessages().subscribe((mensaje: MensajeConversacionGrupal) => {
        this.mensajes.push(mensaje);
      });
    }
  
    iniciarConversacion(grupoId: number) {
      this.conversacionGrupalService.iniciarConversacion(grupoId).subscribe(conversacion => {
        this.conversacion = conversacion;
        this.obtenerMensajes(conversacion.id);
      });
    }
  
    obtenerMensajes(conversacionId: number) {
      this.conversacionGrupalService.obtenerMensajes(conversacionId).subscribe(mensajes => {
        this.mensajes = mensajes;
      });
    }
  
    enviarMensajeRest(conversacionId: number, codigoPersona: string, mensaje: string) {
      const mensajeRequest: MensajeRequest = {
        conversacionId,
        codigoPersona,
        mensaje
      };
      this.conversacionGrupalService.enviarMensajeRest(mensajeRequest).subscribe(mensaje => {
        this.mensajes.push(mensaje);
      });
    }
  
    enviarMensajeWebSocket(conversacionId: number, codigoPersona: string, mensaje: string) {
      const mensajeRequest: MensajeRequest = {
        conversacionId,
        codigoPersona,
        mensaje
      };
      this.webSocketService.sendMessage(mensajeRequest);
    }
  }