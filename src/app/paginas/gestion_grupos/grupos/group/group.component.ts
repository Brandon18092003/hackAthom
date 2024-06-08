import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditarGrupoComponent } from './editar-grupo/editar-grupo.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import Swal from 'sweetalert2';

interface Grupo {
  name: string;
  alerta?: string;
}

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
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {

  @ViewChild('chatContent') private chatContent: ElementRef | undefined;
  grupos: Grupo[] = [
    { name: 'Grupo Taller I' },
    { name: 'Grupo Taller II' },
    { name: 'Grupo Taller III' },
    { name: 'Grupo Taller IV' },
    { name: 'Grupo Taller V' }
  ];

  integrantes: Integrante[] = [
    { nombres: 'Jorge Armando Bonifaz Campos', rol: 'Lider' },
    { nombres: 'Jack Aymar Perez De La Borda', rol: 'Estudiante' },
    { nombres: 'Brandon Mark Huallca Anyosa', rol: 'Estudiante' },
  ];

  displayedColumns: string[] = ['nombres', 'rol', 'acciones'];
  dataSource = new MatTableDataSource(this.integrantes);

  selectedGroup: Grupo | null = null;
  newMessage: string = '';
  mensajes: Mensaje[] = [];
  alertMessage: Mensaje | null = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedGroup = this.grupos[0]; // Selecciona el primer grupo por defecto
    this.cargarMensajesDeGrupo(this.selectedGroup);
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
      // Lógica para enviar el mensaje
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

  openEditDialog(element: { nombres: string, rol: string }): void {
    const dialogRef = this.dialog.open(EditarGrupoComponent, {
      width: '400px',
      data: { name: element.nombres, role: element.rol }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes actualizar la información del integrante
        element.rol = result.role;
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

  eliminarGrupo(grupo: Grupo): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar ${grupo.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupos = this.grupos.filter(g => g !== grupo);
        this.selectedGroup = this.grupos.length ? this.grupos[0] : null;
        Swal.fire(
          'Eliminado!',
          `${grupo.name} ha sido eliminado.`,
          'success'
        );
      }
    });
  }

  openAlertDialog(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '500px',
      data: { asunto: '', fecha: new Date(), hora: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para manejar la creación del mensaje de alerta
        this.alertMessage = {
          contenido: `${result.asunto}. Entrega para el ${result.fecha.toLocaleDateString()} a las ${result.hora}`,
          autor: 'Sistema', // O cualquier otro autor predeterminado
          fecha: new Date()
        };

        if (this.selectedGroup) {
          this.selectedGroup.alerta = this.alertMessage.contenido;
        }
      }
    });
  }
}