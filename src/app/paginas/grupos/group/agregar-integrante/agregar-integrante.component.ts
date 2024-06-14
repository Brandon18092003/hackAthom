import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Curso, MiembroDTO, Persona, PersonaDTO } from '../../../../models/model';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';
import { CursoService } from '../../../../services/curso/curso.service';
import { PersonaService } from '../../../../services/persona/persona.service';
import { MiembroService } from '../../../../services/miembro/miembro.service';
import { response } from 'express';
import { error } from 'console';
import { VerPerfilComponent } from '../../crear-group/ver-perfil/ver-perfil.component';



@Component({
  selector: 'app-agregar-integrante',
  templateUrl: './agregar-integrante.component.html',
  styleUrls: ['./agregar-integrante.component.css']
})
export class AgregarIntegranteComponent implements OnInit{

  salones: Curso[] = [];

  alumnos: { [cursoId: number]: Persona[] } = {};
  miembrosActuales: PersonaDTO[] = [];


  selectedSalon: number = 0;
  filteredAlumnos: Persona[] = [];
  searchQuery: string = '';
  nombre: string = '';
  rol: string = 'Estudiante';
  miembroDTO?:MiembroDTO;
  grupoSeleccionado:number;

  constructor(
    public dialogRef: MatDialogRef<AgregarIntegranteComponent>,
    public dialog: MatDialog,
    private authService: AuthService,
    private cursoService:CursoService,
    private personaService:PersonaService,
    private miembroService:MiembroService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.grupoSeleccionado=data.selectedGroup;
  }
  ngOnInit(): void {
    this.listarCursos();
    this.obtenerMiembrosActuales();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSalonChange(): void {
    this.getPersonasPorCurso(this.selectedSalon);
  }
  
  filterAlumnos(): void {
    if (this.searchQuery && this.alumnos[this.selectedSalon]) {
      this.filteredAlumnos = this.alumnos[this.selectedSalon]
        .filter(alumno => !this.miembrosActuales.some(miembro => miembro.codigo === alumno.codigo))
        .filter(alumno => alumno.nombres.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.filteredAlumnos = (this.alumnos[this.selectedSalon] || [])
        .filter(alumno => !this.miembrosActuales.some(miembro => miembro.codigo === alumno.codigo));
    }
  }
  selectAlumno(alumno: Persona): void {
    this.nombre = alumno.nombres;
    this.miembroDTO={
      codMiembro: alumno.codigo,
      idGrupo: this.grupoSeleccionado
    }
  }


  //Datos
  listarCursos(){
    const codigo= this.authService.getCodigo();
    if(codigo){
      this.cursoService.getCursosByCod(codigo).subscribe(response=>{
        this.salones = response;
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
          this.alumnos[idCurso] = response.filter(persona => persona.codigo !== usuarioActual);
          this.filteredAlumnos = this.alumnos[idCurso];
        }
      },
      (error: string) => {
        Swal.fire("No se pudo encontrar los estudiantes");
      }
    );
  }

  agregarMiembro() {
    console.log(this.miembroDTO);
    if (this.miembroDTO) {
      const miembroExistente = this.miembrosActuales.find(miembro => miembro.codigo === this.miembroDTO?.codMiembro);
      if (miembroExistente) {
        Swal.fire("El estudiante ya está en el grupo");
        return;
      }
  
      this.miembroService.agregarMiembroAlGrupo(this.miembroDTO).subscribe(
        response => {
          Swal.fire("Nuevo estudiante agregado con éxito");
          this.dialogRef.close(this.miembroDTO);
        },
        error => {
          Swal.fire("No se pudo agregar el estudiante");
        }
      );
    } else {
      Swal.fire("No se encontró al estudiante a agregar");
    }
  }

  obtenerMiembrosActuales(): void {
    this.personaService.getPersonasByGrupo(this.grupoSeleccionado).subscribe(
      (response: PersonaDTO[]) => {
        this.miembrosActuales = response;
      },
      (error: string) => {
        Swal.fire("No se pudieron obtener los miembros actuales del grupo");
      }
    );
  }

  
}
