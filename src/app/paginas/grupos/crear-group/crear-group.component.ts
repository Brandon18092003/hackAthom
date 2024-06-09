import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { Curso } from '../../../models/model';
import { CursoService } from '../../../services/curso/curso.service';
import { AuthService } from '../../../services/auth.service';

interface CardItem {
  name: string;
  course: string;
  code: string; // Añadir el código del estudiante
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
export class CrearGroupComponent implements OnInit{
  searchText: string = '';
  selectedCourse: string = '';
  groupName: string = ''; // Añadir propiedad para el nombre del grupo

  cursos?: Curso[];//listar cursos matriculados



  items: CardItem[] = [
    { name: 'Cristopher Walken Gutiérrez Redolfo', course: 'Curso 1 - Sección A', code: 'U20217372' },
    { name: 'ALUMNOS 2', course: 'Curso 1 - Sección A', code: 'U23451281' },
    { name: 'ALUMNOS 3', course: 'Curso 1 - Sección A', code: 'U17347161' },
    { name: 'ALUMNOS 3', course: 'Curso 1 - Sección A', code: 'U17347161' },

    { name: 'Brandon Mark Hualcca Anyosa', course: 'Curso 2 - Sección B', code: 'U20217373' },
    { name: 'AYMAR DE LA BRODA', course: 'Curso 2 - Sección B', code: 'U18648191' },
    { name: 'ARAM AN SALSA', course: 'Curso 2 - Sección B', code: 'U17825151' },
    { name: 'Jorge Armando Bonifaz Campos', course: 'Curso 3 - Sección C', code: 'U20217374' },
    // ...más items con sus respectivos cursos y códigos
  ];
  filteredItems: CardItem[] = [];

  displayedColumns: string[] = ['integrantes', 'codigo', 'accion'];
  dataSource = new MatTableDataSource<GroupMember>([]);

  constructor(public dialog: MatDialog,private authService:AuthService, private cursoService:CursoService) {}

  ngOnInit(): void {
    this.listarCursos();
  }

  

  onCourseSelect(event: MatSelectChange) {
    const newCourse = event.value;

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
          event.source.writeValue(this.selectedCourse);
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
    // Verificar si el estudiante ya está en el grupo usando su código
    const exists = this.dataSource.data.some(member => member.codigo === item.code);

    if (!exists) {
      const newMember: GroupMember = { integrantes: item.name, codigo: item.code }; // Añadir el código del estudiante
      this.dataSource.data = [...this.dataSource.data, newMember];
    } else {
      // Mostrar una alerta si el estudiante ya está en el grupo
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El estudiante ya está en el grupo'
      });
    }
  }

  remove(element: GroupMember) {
    this.dataSource.data = this.dataSource.data.filter(member => member !== element);
  }

  openProfile(item: CardItem) {
    this.dialog.open(VerPerfilComponent, {
      data: { name: item.name }
    });
  }

  //Datos
  listarCursos(){
    const codigo= this.authService.getCodigo();
    if(codigo){
      this.cursoService.getCursosByCod(codigo).subscribe(response=>{
        this.cursos = response;
      },error=>{
        Swal.fire("No se pudo encontrar los cursos matriculados")
      })
    }else{
      Swal.fire("No se encontro al usuario")
    }


  }
}