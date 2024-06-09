import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MiembroDTO, PersonaDTO, UpdateMiembroDTO } from '../../../../models/model';
import { MiembroService } from '../../../../services/miembro/miembro.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-editar-grupo',
  templateUrl: './editar-grupo.component.html',
  styleUrls: ['./editar-grupo.component.css']
})
export class EditarGrupoComponent {
  miembroDTO:UpdateMiembroDTO;

  nombre: string;
  nombre_grupo: string;
  

  constructor(
    private miembroService:MiembroService,
    public dialogRef: MatDialogRef<EditarGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nombre = data.nombre;
    this.nombre_grupo = data.nombre_grupo;

    this.miembroDTO={
      rolGrupo: data.rol,
      codigoUsuario: data.codigo,
      idGrupo: data.grupo
    }
    
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarRol(){
    console.log(this.miembroDTO);
    this.miembroService.updateMiembro(this.miembroDTO).subscribe(response=>{
      Swal.fire("Rol modificado con exito")
      this.dialogRef.close({ rol: this.miembroDTO.rolGrupo });
    },error=>{
      Swal.fire("No se pudo modificar el rol")
    })
  }
}