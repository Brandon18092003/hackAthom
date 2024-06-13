import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { CrearGrupoDTO, Curso, Persona } from '../../../models/model';
import { CursoService } from '../../../services/curso/curso.service';
import { AuthService } from '../../../services/auth.service';
import { PersonaService } from '../../../services/persona/persona.service';
import { response } from 'express';
import { error, group } from 'console';
import { MiembroService } from '../../../services/miembro/miembro.service';
import { Router } from '@angular/router';

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
  selectedCourse?: number;

  cursos?: Curso[];//listar cursos matriculados
  crearGrupoDTO: CrearGrupoDTO;


  items: Persona[]=[];
  filteredItems: Persona[] = [];

  displayedColumns: string[] = ['integrantes', 'codigo', 'accion'];
    dataSource = new MatTableDataSource<GroupMember>([]);
  
  constructor(
    public dialog: MatDialog,
    private authService:AuthService, 
    private cursoService:CursoService,
    private personaService:PersonaService,
    private miembroService:MiembroService,
    private router:Router
  ) {
    this.crearGrupoDTO={
      codigoUsuario:'',
      idCurso:0,
      nombregrupo:'',
      codigosMiembros:[]
    }
  }

  ngOnInit(): void {
    this.listarCursos();
  }

  onCourseSelect(event: MatSelectChange) {
    const newCourse = event.value;

    console.log(newCourse);

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
          this.getPersonasPorCurso(newCourse);
          this.filterItems();
        } else {
          // Reset the select element to the previous value
          event.source.writeValue(this.selectedCourse);
        }
      });
    } else {
      this.selectedCourse = newCourse;
      this.getPersonasPorCurso(newCourse);
      this.filterItems();
    }
  }

  filterItems() {
  
    this.filteredItems = this.items.filter(item =>
      item.nombres.toLowerCase().includes(this.searchText.toLowerCase()) //&&
      //item.course === this.selectedCourse
    )
  }

  add(item: Persona) {
    // Verificar si el estudiante ya está en el grupo usando su código
    const exists = this.dataSource.data.some(member => member.codigo === item.codigo);

    if (!exists) {
      const newMember: GroupMember = { integrantes: item.nombres, codigo: item.codigo }; // Añadir el código del estudiante
      this.dataSource.data = [...this.dataSource.data, newMember];

      // Agregar el código del estudiante al array codigosMiembros
      this.crearGrupoDTO.codigosMiembros.push(item.codigo);

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
    
    this.crearGrupoDTO.codigosMiembros = this.crearGrupoDTO.codigosMiembros.filter(codigo => codigo !== element.codigo);
  }

  //Visualizacion de perfil
  openProfile(item: Persona) {
    this.dialog.open(VerPerfilComponent, {
      width: '800px',
      height: '800px',
      data: { codigoPersona: item.codigo }
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

  getPersonasPorCurso(idCurso: number) {
    this.personaService.getPersonasByCurso(idCurso).subscribe(
      (response: Persona[]) => {
        const usuarioActual = this.authService.getCodigo();
        
        if (usuarioActual) {
          this.items = response.filter(persona => persona.codigo !== usuarioActual); // Filtramos aquí
          this.filteredItems = this.items; // Actualizamos filteredItems también
        }
      },
      (error) => {
        Swal.fire("No se pudo encontrar los estudiantes");
      }
    );
  }
  

  crearGrupo(){
    const codigo = this.authService.getCodigo();

    if(codigo && this.selectedCourse){
      if(this.crearGrupoDTO.codigosMiembros.length>0){
        this.crearGrupoDTO.codigoUsuario=codigo;
        this.crearGrupoDTO.idCurso = this.selectedCourse;
        console.log(this.crearGrupoDTO);
        this.miembroService.crearGrupo(this.crearGrupoDTO).subscribe(response=>{
          Swal.fire("Grupo creado con éxito").then(() => {
            window.location.reload();
          });
        },error=>{
          Swal.fire("No se pudo crear el grupo")
        })
      }else(
        Swal.fire("Necesitas agregar miembros")
      )

    }

  }
}