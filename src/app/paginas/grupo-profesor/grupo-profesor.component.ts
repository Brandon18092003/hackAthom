import { Component } from '@angular/core';


@Component({
  selector: 'app-grupo-profesor',
  templateUrl: './grupo-profesor.component.html',
  styleUrls: ['./grupo-profesor.component.css']
})
export class GrupoProfesorComponent {
  courses = ['Curso 1', 'Curso 2'];
  groups = ['Grupo Taller II', 'Grupo Taller I', 'Grupo Taller III'];
  selectedCourse = '';
  selectedGroup = '';
  selectedGroupMembers: { name: string, role: string }[] = [];
  chatMessages: { sender: string, senderName: string, text: string, time: string }[] = [];
  messageColors: { [key: string]: string } = {};

  onCourseChange(event: any) {
    this.selectedGroup = '';
    this.selectedGroupMembers = [];
    this.chatMessages = [];
  }

  selectGroup(group: string) {
    this.selectedGroup = group;
    // Aquí puedes cambiar la lógica para cargar los miembros del grupo seleccionado
    this.selectedGroupMembers = [
      { name: 'Cristopher Walken', role: 'U20217372' },
      { name: 'Cristopher Walken', role: 'U20217372' },
      { name: 'Cristopher Walken', role: 'U20217372' },
      { name: 'Cristopher Walken', role: 'U20217372' },
      { name: 'Cristopher Walken', role: 'U20217372' }
    ];

    // Aquí puedes cambiar la lógica para cargar los mensajes del chat del grupo seleccionado
    this.chatMessages = [
      { sender: 'student', senderName: 'Juan Pérez', text: 'Hola profesor, tengo una duda sobre la tarea.', time: '10:30 AM' },
      { sender: 'student', senderName: 'Juan Pérez', text: 'No entiendo el segundo problema.', time: '10:35 AM' },
      { sender: 'student', senderName: 'Brandon ', text: 'No entiendo el segundo problema.', time: '10:35 AM' },
      { sender: 'student', senderName: 'Jorge ', text: 'No entiendo el segundo problema.', time: '10:35 AM' }
    ];

    // Asignar colores únicos a cada remitente
    this.assignColorsToSenders();
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
}
