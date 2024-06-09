import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDescripcionComponent } from './edit-descripcion/edit-descripcion.component';
import { AddHobbiesComponent } from './add-hobbies/add-hobbies.component';
import { AddHabilidadesComponent } from './add-habilidades/add-habilidades.component';
import { EditInfComponent } from './edit-inf/edit-inf.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {


  //***********Data estatica ****************/


  habilidades: string[] = [
    'Liderazgo',
    'Trabajo en equipo',
    'Comunicación asertiva'
  ];
  hobbies: string[] = [
    'Programación Back-End',
    'Base de datos',
    'Scrum'
  ];
  companeros: string[] = [
    'Camila Lisset Taype Sumen',
    'Juan Pérez',
    'Maria López'
  ];
  cursos: { nombre: string, codigo: string }[] = [
    { nombre: 'Programación web', codigo: '1456' },
    { nombre: 'Arquitectura Orientada al Servicio', codigo: '5202' },
    { nombre: 'Sistemas Distribuidos', codigo: '5202' }
  ];
  descripcion: string = 'Hola, soy Christopher, estudiante del IX ciclo de la carrera de Ingeniería de Sistemas e Informática, aquí te contaré un poco más sobre mí :D';
  informacion: string = 'Actualmente me encuentro trabajando, por lo que mi horario de disponibilidad podría variar.';







  //****Clases que habren las ventans flotantes*****/

  constructor(public dialog: MatDialog) {}

  openEditDescriptionModal() {
    const dialogRef = this.dialog.open(EditDescripcionComponent, {
      width: '500px',
      data: { descripcion: this.descripcion }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.descripcion = result;
      }
    });
  }

  openAddSkillModal() {
    const dialogRef = this.dialog.open(AddHabilidadesComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.habilidades.push(result);
      }
    });
  }

  openAddHobbyModal() {
    const dialogRef = this.dialog.open(AddHobbiesComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hobbies.push(result);
      }
    });
  }

  openEditAdditionalInfoModal() {
    const dialogRef = this.dialog.open(EditInfComponent,{
      width: '500px',
      data: { informacion: this.informacion}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.informacion = result;
      }
    });
  }


  //********Otras clases**********/

  eliminarHabilidad(index: number) {
    this.habilidades.splice(index, 1);
  }

  eliminarHobby(index: number) {
    this.hobbies.splice(index, 1);
  }

}
