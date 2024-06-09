import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent {
  data = {
    name: 'Cristopher Walken Gutierrez Redolfo',
    description: 'Hola, soy Cristopher, estudiante del IX ciclo de la carrera de Ingeniería de Sistemas e Informática, aquí te contaré un poco más sobre mi :D',
    habilidades: ['Liderazgo', 'Trabajo en equipo', 'Comunicación asertiva'],
    buenoEn: ['Programación Back-End', 'Base de datos', 'Scrum'],
    informacionAdicional: 'Actualmente me encuentro trabajando, por lo que mi horario de disponibilidad podría variar.',
    ultimosCompaneros: ['Camila Lisset Taype Sumen', 'Camila Lisset Taype Sumen', 'Camila Lisset Taype Sumen'],
    calificacionesRecientes: [
        'Programación web - 1456',
        'Arquitectura Orientada al Servicio - 5202',
        'Sistemas Distribuidos - 5202'
    ]
  };

  /*constructor(@Inject(MAT_DIALOG_DATA) public inputData: any) {
    if (inputData) {
      this.data = inputData;
    }
  }*/
}
