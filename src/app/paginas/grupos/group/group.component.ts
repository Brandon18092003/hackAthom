import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditarGrupoComponent } from './editar-grupo/editar-grupo.component';
import { AlertDialogComponent, AlertDialogData } from './alert-dialog/alert-dialog.component';
import { EditAlertComponent, EditAlertDialogData } from './edit-alert/edit-alert.component';
import { AlertService } from '../../../services/alert.service';
import { AgregarIntegranteComponent } from './agregar-integrante/agregar-integrante.component';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { Grupo, MensajeRequest, MensajeConversacionGrupal, ConversacionGrupal, PersonaDTO, MiembroDTO, Persona, Notificacion } from '../../../models/model';
import { GroupService } from '../../../services/grupo/grupo-service.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { ConversacionGrupalService } from '../../../services/conversacion-grupal.service';
import { PersonaService } from '../../../services/persona/persona.service';
import { MiembroService } from '../../../services/miembro/miembro.service';
import { Console, error } from 'console';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';


interface Integrante {
  nombres: string;
  rol: string;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @ViewChild('chatContent') private chatContent: ElementRef | undefined;

  eslider:boolean=false;
  personaActual?:Persona;
  gruposeleccionado?:Grupo;


  grupos: Grupo[] = [];
  selectedGroup: Grupo | null = null;
  newMessage: string = '';
  mensajes: MensajeConversacionGrupal[] = [];
  alertMessage: any = null;
  alertas: Notificacion[] = []; // Array para almacenar las alertas
  
  integrantes: PersonaDTO[] = [];
  currentConversacionId: number | null = null;

  displayedColumns: string[] = ['nombres', 'rol', 'acciones'];
  dataSource = new MatTableDataSource(this.integrantes);
  isPanelOpen: boolean = false; // Estado del panel deslizante

  miembroDTO?:MiembroDTO;

  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private groupService: GroupService,
    private conversacionGrupalService: ConversacionGrupalService,
    public authService: AuthService,  // Cambiar a public
    private webSocketService: WebSocketService,
    private personaService: PersonaService,
    private miembroService: MiembroService,
    private notificacionService:NotificacionService
  ) { }

  ngOnInit(): void {

    const codigoUsuario = this.authService.getCodigo(); // Obtener el código de usuario del localStorage
    if (codigoUsuario) {
      this.groupService.getGruposByCodPersona(codigoUsuario).subscribe(grupos => {
        this.grupos = grupos;
        if (this.grupos.length > 0) {
          this.selectGroup(this.grupos[0]);
        }
      }, error => {
        if (error.status === 401) {
          console.error('Unauthorized access - 401');
        }
      });
    } else {
      console.error('No user code found in localStorage');
    }

    this.webSocketService.getMessages().subscribe((mensaje: MensajeConversacionGrupal) => {
      if (mensaje.id) {
        this.mensajes.push(mensaje);
        this.scrollToBottom();
      } else {
        console.error('Invalid message structure or conversation id mismatch', mensaje);
      }
    });
  }

  cargarMensajesDeGrupo(grupo: Grupo): void {
    console.log(`Selected group id: ${grupo.id}`);
    this.conversacionGrupalService.obtenerConversacionPorGrupo(grupo.id).subscribe(conversacion => {
      if (conversacion) {
        console.log(`Conversation id: ${conversacion.id}`);
        this.selectedGroup = grupo;
        this.currentConversacionId = conversacion.id;
        this.webSocketService.subscribeToGroupMessages(conversacion.id);
        this.conversacionGrupalService.obtenerMensajes(conversacion.id).subscribe(mensajes => {
          this.mensajes = mensajes;
          this.scrollToBottom();
        });
      } else {
        console.error('Conversación no encontrada para el grupo:', grupo.nombre);
      }
    });
  }

  selectGroup(grupo: Grupo): void {
    //Comprobar si el usuario es lider
    this.cargarMensajesDeGrupo(grupo);
    this.obtenerPersonasPorGrupo(grupo.id);
    this.scrollToBottom();
    this.gruposeleccionado=grupo;
    console.log("grupo seleccionado",grupo)
    this.comprobarLider(grupo.id);
    this.obtenerAlertasDelGrupo(grupo.id)
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedGroup) {
      const mensajeRequest: MensajeRequest = {
        conversacionId: this.currentConversacionId!,
        codigoPersona: this.authService.getCodigo()!,
        mensaje: this.newMessage
      };
      this.webSocketService.sendMessage(mensajeRequest);
      this.newMessage = '';
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContent) {
        this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
      }
    }, 0);
  }

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  openEditDialog(element: PersonaDTO): void {
    const dialogRef = this.dialog.open(EditarGrupoComponent, {
      width: '400px',
      data: { 
        nombre: element.nombres,
        rol: element.rol,
        codigo: element.codigo,
        nombre_grupo: this.gruposeleccionado?.nombre,
        grupo: this.gruposeleccionado?.id,
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.rol = result.rol;
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AgregarIntegranteComponent, {
      width: '800px',
      height: '490px',
      data: {
        selectedGroup: this.gruposeleccionado?.id
      }
    });
  
    dialogRef.afterClosed().subscribe(nuevoMiembro => {
      if (nuevoMiembro && this.gruposeleccionado) {

        const miembroExistente = this.integrantes.find(miembro => miembro.codigo === nuevoMiembro.codMiembro);

        if (miembroExistente) {
          // El miembro ya existe
          Swal.fire("El estudiante ya ha sido agregado al grupo")
        } else {
          // El miembro no existe, así que lo agregamos
          if (nuevoMiembro.codMiembro) {
            this.obtenerPersonasPorGrupo(this.gruposeleccionado.id);
            this.integrantes.push(nuevoMiembro);
            this.dataSource.data = this.integrantes;
          }
        }
      }
    });
  }

  eliminarIntegrante(element: PersonaDTO): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar a ${element.nombres} del grupo?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      const codigo = element.codigo;
      console.log(codigo);
      if (result.isConfirmed && codigo && this.gruposeleccionado) {
        this.miembroDTO={
          codMiembro: codigo,
          idGrupo: this.gruposeleccionado.id,
        }
        console.log(this.miembroDTO);
        this.miembroService.deleteMiembro(this.miembroDTO).subscribe(response=>{
        this.integrantes = this.integrantes.filter(integrante => integrante !== element);
        this.dataSource.data = this.integrantes;
        Swal.fire(
          'Eliminado!',
          `${element.nombres} ha sido eliminado del grupo.`,
          'success'
        );
        },error=>{
          Swal.fire("No se pudo eliminar el estudiante")
        })
        
      }else(
        Swal.fire("No se pudo eliminar el estudiante")
      )
    });
  }

  eliminarGrupo(grupo: Grupo | null): void {
    if (grupo) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar ${grupo.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.grupos = this.grupos.filter(g => g !== grupo);
          this.selectedGroup = null; // Deja el selectedGroup en null
          Swal.fire(
            'Eliminado!',
            `${grupo.nombre} ha sido eliminado.`,
            'success'
          );
          this.togglePanel();  // Cierra el panel deslizante después de eliminar el grupo
        }
      });
    }
  }

  salirDelGrupo(grupo: Grupo | null): void {
    if (grupo) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas salir del grupo ${grupo.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.grupos = this.grupos.filter(g => g !== grupo);
          this.selectedGroup = null; // Deja el selectedGroup en null
          Swal.fire(
            'Salido!',
            `Has salido del grupo ${grupo.nombre}.`,
            'success'
          );
          this.togglePanel();  // Cierra el panel deslizante después de salir del grupo
        }
      });
    }
  }

  openAlertDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '500px',
      data: { asunto: '', fecha: new Date(), hora: '',grupo: this.selectedGroup }
    });

    dialogRef.afterClosed().subscribe((result: any | undefined) => {
      if (result) {
        this.alertas.push(result);
      }
    });
  }

  editarAlerta(alerta: any): void {
    const dialogRef = this.dialog.open(EditAlertComponent, {
      width: '500px',
      data: { ...alerta }
    });

    dialogRef.afterClosed().subscribe((result: any | undefined) => {
      if (result) {
        const index = this.alertas.findIndex(a => a === alerta);
        if (index !== -1) {
          this.alertas[index] = result;
        }
      }
    });
  }

  eliminarAlerta(alerta: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la alerta ${alerta.asunto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertas = this.alertas.filter(a => a !== alerta);
        Swal.fire(
          'Eliminado!',
          `La alerta ${alerta.asunto} ha sido eliminada.`,
          'success'
        );
      }
    });
  }

  anclarAlerta(alerta: any): void {
    this.alertMessage = alerta;

    if (this.selectedGroup) {
      this.selectedGroup.alerta = alerta.asunto;
    }

    this.alertService.setPinnedAlert(true);

    Swal.fire({
      icon: 'info',
      title: 'Alerta anclada',
      text: `La alerta ${alerta.asunto} ha sido anclada.`
    });

  }

  desanclarAlerta(): void {
    if (this.alertMessage) {
      const alerta = this.alertMessage;
      this.alertMessage = null;

      if (this.selectedGroup) {
        this.selectedGroup.alerta = undefined;
      }

      this.alertService.setPinnedAlert(false);

      Swal.fire({
        icon: 'info',
        title: 'Alerta desanclada',
        text: `La alerta ${alerta.asunto} ha sido desanclada.`
      });
    }
  }

  isAlertaAnclada(alerta: any): boolean {
    return this.alertMessage === alerta;
  }

    //Obtener personas del grupo
  obtenerPersonasPorGrupo(idGrupo:number){
      this.personaService.getPersonasByGrupo(idGrupo).subscribe(response=>{
        this.integrantes=response;
        this.dataSource.data=this.integrantes;
        console.log(this.dataSource.data);
      })
  }

  comprobarLider(idGrupo:number){
      console.log(idGrupo);
      this.personaService.getLiderByGroup(idGrupo).subscribe(response=>{
        const codigoActual = this.authService.getCodigo();
        this.personaActual=response
        const codigoLider = this.personaActual.codigo;
        console.log(codigoLider);
        console.log(codigoActual);
        if(codigoLider==codigoActual){
          this.eslider=true;
        }else{
          this.eslider=false;
        }
      },error=>{
        Swal.fire("No se pudo comprobar si es lider")
      })
  }

  obtenerAlertasDelGrupo(idGrupo:number){
    this.notificacionService.getNotificationsByGrupo(idGrupo).subscribe(response=>{
      this.alertas=response;
    },error=>{
      Swal.fire("No se pudieron obtener las notificaciones del grupo")
    })
  }
}