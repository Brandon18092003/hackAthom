import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDescripcionComponent } from './edit-descripcion/edit-descripcion.component';
import { AddHobbiesComponent } from './add-hobbies/add-hobbies.component';
import { AddHabilidadesComponent } from './add-habilidades/add-habilidades.component';
import { EditInfComponent } from './edit-inf/edit-inf.component';
import { Curso, EliminarHabilidadDTO, EliminarHobbyDTO, Habilidad, Hobby, InfoDTO } from '../../models/model';
import { HabilidadService } from '../../services/habilidad.service';
import { HobbyService } from '../../services/hobby.service';
import { PerfilService } from '../../services/perfil.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CursoService } from '../../services/curso/curso.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  habilidades: Habilidad[] = [];
  hobbies: Hobby[] = [];
  companeros: string[] = [
    'Camila Lisset Taype Sumen',
    'Juan Pérez',
    'Maria López'
  ];
  cursos: Curso[] = [];
  descripcion: string = '';
  informacion: string = '';
  nombres: string = '';
  ap_paterno: string = '';
  ap_materno: string = '';

  constructor(
    public dialog: MatDialog,
    private habilidadService: HabilidadService,
    private hobbyService: HobbyService,
    private authService: AuthService,
    private perfilService: PerfilService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    const codigoPersona = this.authService.getCodigo();
    if (codigoPersona) {
      this.habilidadService.getHabilidades(codigoPersona).subscribe(habilidades => this.habilidades = habilidades);
      this.hobbyService.getHobbies(codigoPersona).subscribe(hobbies => this.hobbies = hobbies);
      this.perfilService.getInfo(codigoPersona).subscribe(info => {
        this.descripcion = info.descripcion;
        this.informacion = info.infoAdicional;  // Make sure the field name matches the DTO
        this.nombres = info.nombres;
        this.ap_paterno = info.ap_paterno;
        this.ap_materno = info.ap_materno;
      });
      this.cursoService.getCursosByCod(codigoPersona).subscribe(cursos => this.cursos = cursos);
    }
  }

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
    const dialogRef = this.dialog.open(EditInfComponent, {
      width: '500px',
      data: { informacion: this.informacion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.informacion = result;
        this.actualizarInfoAdicional(result);
      }
    });
  }

  actualizarInfoAdicional(nuevaInformacion: string) {
    const codigo = this.authService.getCodigo();
    if (codigo) {
      const actualizarInfoAdicionalDTO = { codigoPersona: codigo, infoAdicional: nuevaInformacion };
      this.perfilService.actualizarInfoAdicional(codigo, actualizarInfoAdicionalDTO).subscribe({
        next: () => {
          Swal.fire('Actualizado!', 'La información adicional ha sido actualizada.', 'success');
        },
        error: (error) => {
          console.error('Error al actualizar la información adicional:', error);
          Swal.fire('Error!', 'No se pudo actualizar la información adicional.', 'error');
        }
      });
    }
  }

  eliminarHabilidad(index: number) {
    const habilidad = this.habilidades[index];
    console.log('Eliminando habilidad:', habilidad);
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la habilidad ${habilidad.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      const codigo = this.authService.getCodigo();
      if (result.isConfirmed && codigo) {
        const eliminarHabilidadDTO: EliminarHabilidadDTO = { idHabilidad: habilidad.id, codigoPersona: codigo };
        this.habilidadService.eliminarHabilidad(eliminarHabilidadDTO).subscribe({
          next: () => {
            console.log('Habilidad eliminada con éxito:', habilidad);
            this.habilidades.splice(index, 1);
            Swal.fire('Eliminado!', 'La habilidad ha sido eliminada.', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar habilidad:', error);
            Swal.fire('Error!', 'No se pudo eliminar la habilidad.', 'error');
          }
        });
      }
    });
  }

  eliminarHobby(index: number) {
    const hobby = this.hobbies[index];
    console.log('Eliminando hobby:', hobby);
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el hobby ${hobby.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      const codigo = this.authService.getCodigo();
      if (result.isConfirmed && codigo) {
        const eliminarHobbyDTO: EliminarHobbyDTO = { idPerfilHobby: hobby.id, codigoPersona: codigo };
        this.hobbyService.eliminarHobby(eliminarHobbyDTO).subscribe({
          next: () => {
            console.log('Hobby eliminado con éxito:', hobby);
            this.hobbies.splice(index, 1);
            Swal.fire('Eliminado!', 'El hobby ha sido eliminado.', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar hobby:', error);
            Swal.fire('Error!', 'No se pudo eliminar el hobby.', 'error');
          }
        });
      }
    });
  }
}
