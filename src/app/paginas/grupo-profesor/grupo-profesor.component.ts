import { Component } from '@angular/core';

@Component({
  selector: 'app-grupo-profesor',
  templateUrl: './grupo-profesor.component.html',
  styleUrl: './grupo-profesor.component.css'
})
export class GrupoProfesorComponent {
  courses = ['Curso 1', 'Curso 2'];
  groups = ['Grupo Taller II', 'Grupo Taller I', 'Grupo Taller III'];
  selectedCourse = '';
  selectedGroup = '';
  selectedGroupMembers = [
    { name: 'Cristopher Walken', role: 'U20217372' },
    { name: 'Cristopher Walken', role: 'U20217372' },
    { name: 'Cristopher Walken', role: 'U20217372' },
    { name: 'Cristopher Walken', role: 'U20217372' },
    { name: 'Cristopher Walken', role: 'U20217372' }
  ];

  onCourseChange(event: any) {
    this.selectedGroup = '';
    this.selectedGroupMembers = [];
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
  }
}
