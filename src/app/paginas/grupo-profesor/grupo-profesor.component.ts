import { Component, OnInit } from '@angular/core';
import { Curso, Grupo, Persona, PersonaDTO } from '../../models/model';
import { DocenteService } from '../../services/docente/docente.service';
import { response } from 'express';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { PersonaService } from '../../services/persona/persona.service';
import { error } from 'console';


@Component({
  selector: 'app-grupo-profesor',
  templateUrl: './grupo-profesor.component.html',
  styleUrls: ['./grupo-profesor.component.css']
})
export class GrupoProfesorComponent implements OnInit{

  courses:Curso[] = [];
  groups:Grupo[] = [];
  selectedCourse = '';
  selectedGroup?:Grupo;
  selectedGroupMembers:PersonaDTO[] = [];
  chatMessages: { sender: string, senderName: string, text: string, time: string }[] = [];
  messageColors: { [key: string]: string } = {};

  constructor(
    private authService:AuthService,
    private docenteService:DocenteService,
    private personaService:PersonaService
  ){}

  ngOnInit(): void {
    this.obtenerCursos();

  }

  onCourseChange(event: any) {
    console.log("Event: ",event.target.value);
    //this.selectedGroup = '';
    this.selectedGroupMembers = [];
    this.obtenerGrupos(event.target.value);
    this.chatMessages = [];
  }

  selectGroup(group: Grupo) {
    this.selectedGroup = group;

    // Aquí puedes cambiar la lógica para cargar los miembros del grupo seleccionado
    this.obtenerMiembros(group.id);

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

  obtenerCursos(){
    const codigo=this.authService.getCodigo();
    if(codigo){
      this.docenteService.getCursosByDocente(codigo).subscribe(response=>{
        this.courses=response;  
      },error=>{
        Swal.fire("No se pudo obtener los cursos")
      })
    }else{
      Swal.fire("No se pudo obtener el codigo")
    }
  }

  obtenerGrupos(idCurso:number){
    const codigo=this.authService.getCodigo();
    if(codigo){
      this.docenteService.getGruposByCursoDocente(codigo,idCurso).subscribe(response=>{
        this.groups=response;
      },error=>{
        Swal.fire("No se pudo obtener los grupos")
      })
    }else{
      Swal.fire("No se pudo obtener el codigo")
    }
  }

  obtenerMiembros(idGrupo:number){
    this.personaService.getPersonasByGrupo(idGrupo).subscribe(response=>{
      this.selectedGroupMembers=response;
    },error=>{
      Swal.fire("Error obteniendo los miembros")
    })
  }
}
