import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';

interface CardItem {
  name: string;
  course: string;
}

interface GroupMember {
  integrantes: string;
  codigo: string;
}

@Component({
  selector: 'app-crear-group',
  templateUrl: './crear-group.component.html',
  styleUrls: ['./crear-group.component.css']
})
export class CrearGroupComponent {
  searchText: string = '';
  selectedCourse: string = '';
  cursos: string[] = ['Curso 1 - Sección A', 'Curso 2 - Sección B', 'Curso 3 - Sección C'];
  items: CardItem[] = [
    { name: 'Cristopher Walken Gutiérrez Redolfo', course: 'Curso 1 - Sección A' },
    { name: 'Brandon Mark Hualcca Anyosa', course: 'Curso 2 - Sección B' },
    { name: 'Jorge Armando Bonifaz Campos', course: 'Curso 3 - Sección C' },
    // ...más items con sus respectivos cursos
  ];
  filteredItems: CardItem[] = [];

  displayedColumns: string[] = ['integrantes', 'codigo', 'accion'];
  dataSource = new MatTableDataSource<GroupMember>([
    { integrantes: 'Cristopher Walken', codigo: 'U20217372' },
    { integrantes: 'Cristopher Walken', codigo: 'U20217372' },
    { integrantes: 'Cristopher Walken', codigo: 'U20217372' },
    { integrantes: 'Brandon Mark', codigo: 'U20217373' },
    { integrantes: 'Jorge Armando', codigo: 'U20217374' }
  ]);

  constructor(public dialog: MatDialog) {}

  onCourseSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newCourse = selectElement.value;

    if (this.dataSource.data.length > 0) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se vaciará la tabla de miembros del grupo. ¿Deseas continuar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.selectedCourse = newCourse;
          this.dataSource.data = [];
          this.filterItems();
        } else {
          // Reset the select element to the previous value
          selectElement.value = this.selectedCourse;
        }
      });
    } else {
      this.selectedCourse = newCourse;
      this.filterItems();
    }
  }

  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      item.course === this.selectedCourse
    );
  }

  add(item: CardItem) {
    const newMember: GroupMember = { integrantes: item.name, codigo: 'N/A' }; // Assume a default or generated code
    this.dataSource.data = [...this.dataSource.data, newMember];
  }

  remove(element: GroupMember) {
    this.dataSource.data = this.dataSource.data.filter(member => member !== element);
  }

  openProfile(item: CardItem) {
    this.dialog.open(VerPerfilComponent, {
      data: { name: item.name }
    });
  }
}