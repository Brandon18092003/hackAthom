import { Component, OnInit } from '@angular/core';
import { Curso, Grupo, PersonaDTO, MensajeRequest, MensajeConversacionGrupal } from '../../models/model';
import { DocenteService } from '../../services/docente/docente.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { PersonaService } from '../../services/persona/persona.service';
import { ConversacionGrupalService } from '../../services/conversacion-grupal.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-grupo-profesor',
  templateUrl: './grupo-profesor.component.html',
  styleUrls: ['./grupo-profesor.component.css']
})
export class GrupoProfesorComponent implements OnInit {

  courses: Curso[] = [];
  groups: Grupo[] = [];
  selectedCourse = '';
  selectedGroup?: Grupo;
  selectedGroupMembers: PersonaDTO[] = [];
  chatMessages: { sender: string, senderName: string, text: string, time: string }[] = [];
  messageColors: { [key: string]: string } = {};
  newMessage: string = '';
  currentConversacionId: number | null = null;

  constructor(
    private authService: AuthService,
    private docenteService: DocenteService,
    private personaService: PersonaService,
    private conversacionGrupalService: ConversacionGrupalService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.obtenerCursos();

    this.webSocketService.getMessages().subscribe((mensaje: MensajeConversacionGrupal) => {
      if (mensaje.id === this.currentConversacionId) {
        this.chatMessages.push({
          sender: mensaje.persona.codigo === this.authService.getCodigo() ? 'teacher' : 'student',
          senderName: mensaje.persona.nombres,
          text: mensaje.mensaje,
          time: new Date(mensaje.fechaEnvio).toLocaleTimeString()
        });
      }
    });
  }

  onCourseChange(event: any) {
    this.selectedGroupMembers = [];
    this.obtenerGrupos(event.target.value);
    this.chatMessages = [];
  }

  selectGroup(group: Grupo) {
    this.selectedGroup = group;
    this.obtenerMiembros(group.id);

    this.conversacionGrupalService.obtenerConversacionPorGrupo(group.id).subscribe(conversacion => {
      if (conversacion) {
        this.currentConversacionId = conversacion.id;
        this.webSocketService.subscribeToGroupMessages(conversacion.id);
        this.conversacionGrupalService.obtenerMensajes(conversacion.id).subscribe(mensajes => {
          this.chatMessages = mensajes.map(mensaje => ({
            sender: mensaje.persona.codigo === this.authService.getCodigo() ? 'teacher' : 'student',
            senderName: mensaje.persona.nombres,
            text: mensaje.mensaje,
            time: new Date(mensaje.fechaEnvio).toLocaleTimeString()
          }));
          this.assignColorsToSenders();
        });
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedGroup && this.currentConversacionId) {
      const mensajeRequest: MensajeRequest = {
        conversacionId: this.currentConversacionId,
        codigoPersona: this.authService.getCodigo()!,
        mensaje: this.newMessage
      };
      this.webSocketService.sendMessage(mensajeRequest);
      this.newMessage = '';
    }
  }

  assignColorsToSenders() {
    const colors = ['#e9f5ff', '#fff3e6', '#e6ffe9', '#f0e6ff', '#fffce6'];
    let colorIndex = 0;
    this.messageColors = {};
    this.chatMessages.forEach(message => {
      if (!this.messageColors[message.senderName]) {
        this.messageColors[message.senderName] = colors[colorIndex % colors.length];
        colorIndex++;
      }
    });
  }

  getMessageColor(senderName: string): string {
    return this.messageColors[senderName];
  }

  obtenerCursos() {
    const codigo = this.authService.getCodigo();
    if (codigo) {
      this.docenteService.getCursosByDocente(codigo).subscribe(response => {
        this.courses = response;
      }, error => {
        Swal.fire("No se pudo obtener los cursos");
      });
    } else {
      Swal.fire("No se pudo obtener el código");
    }
  }

  obtenerGrupos(idCurso: number) {
    const codigo = this.authService.getCodigo();
    if (codigo) {
      this.docenteService.getGruposByCursoDocente(codigo, idCurso).subscribe(response => {
        this.groups = response;
      }, error => {
        Swal.fire("No se pudo obtener los grupos");
      });
    } else {
      Swal.fire("No se pudo obtener el código");
    }
  }

  obtenerMiembros(idGrupo: number) {
    this.personaService.getPersonasByGrupo(idGrupo).subscribe(response => {
      this.selectedGroupMembers = response;
    }, error => {
      Swal.fire("Error obteniendo los miembros");
    });
  }
}
