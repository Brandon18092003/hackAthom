import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NotificacionService } from '../../../../services/notificacion/notificacion.service';
import { response } from 'express';
import { Notificacion } from '../../../../models/model';
import { error } from 'console';
import { Time } from '@angular/common';

export interface AlertDialogData {
  asunto: string;
  fecha: Date | null;
  hora: string;
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  minDate: Date;
  notificacion?:Notificacion;
  hora!:Time;

  constructor(
    private notificacionService:NotificacionService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.minDate = new Date();

  }

  ngOnInit(): void {
    this.data.fecha = null; // Inicializa la fecha como null para que el campo esté vacío
  }

  onSaveClick(): void {
    if (!this.data.asunto || !this.data.fecha ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios.'
      });
      return;
    }else{
      this.crearAlerta();
    }

    const selectedDate = new Date(`${this.data.fecha.toISOString().split('T')[0]}T${this.data.hora}:00`);
    const now = new Date();

    if (selectedDate <= now) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha y hora deben ser futuras. Si es hoy, la hora debe ser futura.'
      });
      return;
    }

    this.dialogRef.close(this.notificacion);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  crearAlerta(){
    this.notificacion={
      id:0,
      mensaje: this.data.asunto,
      fecha: this.data.fecha,
      hora: this.hora,
      grupo: this.data.grupo
    }

    if(this.notificacion){
      this.notificacionService.crearAlerta(this.notificacion.grupo.id,this.notificacion).subscribe(response=>{
        Swal.fire("Alerta creada exitosamente")
      },error=>{
      Swal.fire("No se pudo crear la alerta")
      })
    }

  }
}
