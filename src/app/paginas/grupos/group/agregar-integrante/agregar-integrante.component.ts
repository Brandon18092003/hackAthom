import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Alumno {
  nombre: string;
  rol: string;
}

interface Salones {
  [key: string]: Alumno[];
}

@Component({
  selector: 'app-agregar-integrante',
  templateUrl: './agregar-integrante.component.html',
  styleUrls: ['./agregar-integrante.component.css']
})
export class AgregarIntegranteComponent {
  salones: string[] = ['Salón 1', 'Salón 2', 'Salón 3'];
  alumnos: Salones = {
    'Salón 1': [
      { nombre: 'Alumno 1-1', rol: 'Estudiante' },
      { nombre: 'Alumno 1-2', rol: 'Estudiante' }
    ],
    'Salón 2': [
      { nombre: 'Alumno 2-1', rol: 'Estudiante' },
      { nombre: 'Alumno 2-2', rol: 'Estudiante' }
    ],
    'Salón 3': [
      { nombre: 'Alumno 3-1', rol: 'Estudiante' },
      { nombre: 'Alumno 3-2', rol: 'Estudiante' }
    ]
  };

  selectedSalon: string = '';
  filteredAlumnos: Alumno[] = [];
  searchQuery: string = '';
  nombre: string = '';
  rol: string = '';

  constructor(public dialogRef: MatDialogRef<AgregarIntegranteComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.nombre && this.rol) {
      this.dialogRef.close({ nombre: this.nombre, rol: this.rol });
    }
  }

  onSalonChange(): void {
    this.filteredAlumnos = this.alumnos[this.selectedSalon] || [];
  }

  filterAlumnos(): void {
    if (this.searchQuery) {
      this.filteredAlumnos = this.alumnos[this.selectedSalon].filter((alumno: Alumno) =>
        alumno.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredAlumnos = this.alumnos[this.selectedSalon] || [];
    }
  }

  selectAlumno(alumno: Alumno): void {
    this.nombre = alumno.nombre;
    this.rol = alumno.rol;
  }
}
