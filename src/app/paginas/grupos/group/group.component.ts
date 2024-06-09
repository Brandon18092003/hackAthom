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
import { Grupo } from '../../../models/model';
import { GroupService } from '../../../services/grupo/grupo-service.service';

interface Mensaje {
  contenido: string;
  autor: string;
  fecha: Date;
}

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
  grupos: Grupo[] = [];
  selectedGroup: Grupo | null = null;
  newMessage: string = '';
  mensajes: Mensaje[] = [];
  alertMessage: AlertDialogData | null = null;
  alertas: AlertDialogData[] = [];  // Array para almacenar las alertas

  integrantes: Integrante[] = [
    { nombres: 'Jorge Armando Bonifaz Campos', rol: 'Lider' },
    { nombres: 'Jack Aymar Perez De La Borda', rol: 'Estudiante' },
    { nombres: 'Brandon Mark Huallca Anyosa', rol: 'Estudiante' },
  ];

  displayedColumns: string[] = ['nombres', 'rol', 'acciones'];
  dataSource = new MatTableDataSource(this.integrantes);

  isPanelOpen: boolean = false; // Estado del panel deslizante

  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private groupService: GroupService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const codigoUsuario = this.authService.getCodigo(); // Obtener el código de usuario del localStorage
    if (codigoUsuario) {
      this.groupService.getGruposByCodPersona(codigoUsuario).subscribe(grupos => {
        this.grupos = grupos;
        if (this.grupos.length > 0) {
          this.selectGroup(this.grupos[0]); // Selecciona el primer grupo por defecto
        }
      }, error => {
        if (error.status === 401) {
          console.error('Unauthorized access - 401');
          // Manejar el error 401 aquí (redireccionar al login, mostrar mensaje, etc.)
        }
      });
    } else {
      console.error('No user code found in localStorage');
      // Manejar el caso donde no se encuentra el código de usuario en localStorage
    }
  }

  cargarMensajesDeGrupo(grupo: Grupo): void {
    // Lógica para cargar los mensajes del grupo seleccionado
    // Aquí estamos usando datos estáticos para la demostración
    this.mensajes = [
      { contenido: 'Hola a todos', autor: 'Usuario1', fecha: new Date() },
      { contenido: 'Hola, ¿cómo están?', autor: 'Usuario2', fecha: new Date() },
      { contenido: 'Todo bien, gracias', autor: 'Usuario1', fecha: new Date() }
    ];
    this.scrollToBottom();
  }

  selectGroup(grupo: Grupo): void {
    this.selectedGroup = grupo;
    this.cargarMensajesDeGrupo(grupo);
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const nuevoMensaje: Mensaje = {
        contenido: this.newMessage,
        autor: 'Yo', // Cambia esto por el nombre del usuario actual
        fecha: new Date()
      };
      this.mensajes.push(nuevoMensaje);
      this.newMessage = '';
      this.scrollToBottom();
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

  openEditDialog(element: { nombres: string, rol: string }): void {
    const dialogRef = this.dialog.open(EditarGrupoComponent, {
      width: '400px',
      data: { name: element.nombres, role: element.rol }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        element.rol = result.role;
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AgregarIntegranteComponent, {
      width: '800px',
      height: '490px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.integrantes.push({ nombres: result.nombre, rol: result.rol });
        this.dataSource.data = this.integrantes;
      }
    });
  }

  eliminarIntegrante(element: Integrante): void {
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
      if (result.isConfirmed) {
        this.integrantes = this.integrantes.filter(integrante => integrante !== element);
        this.dataSource.data = this.integrantes;
        Swal.fire(
          'Eliminado!',
          `${element.nombres} ha sido eliminado del grupo.`,
          'success'
        );
      }
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
      data: { asunto: '', fecha: new Date(), hora: '' }
    });

    dialogRef.afterClosed().subscribe((result: AlertDialogData | undefined) => {
      if (result) {
        this.alertas.push(result);
      }
    });
  }

  editarAlerta(alerta: AlertDialogData): void {
    const dialogRef = this.dialog.open(EditAlertComponent, {
      width: '500px',
      data: { ...alerta }
    });

    dialogRef.afterClosed().subscribe((result: EditAlertDialogData | undefined) => {
      if (result) {
        const index = this.alertas.findIndex(a => a === alerta);
        if (index !== -1) {
          this.alertas[index] = result;
        }
      }
    });
  }

  eliminarAlerta(alerta: AlertDialogData): void {
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

  anclarAlerta(alerta: AlertDialogData): void {
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

  isAlertaAnclada(alerta: AlertDialogData): boolean {
    return this.alertMessage === alerta;
  }
}