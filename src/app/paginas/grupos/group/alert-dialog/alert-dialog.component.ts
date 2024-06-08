import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

export interface AlertDialogData {
  asunto: string;
  fecha: Date;
  hora: string;
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  minDate: string;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.data.fecha = new Date();
  }

  onSaveClick(): void {
    // Crear un objeto Date para la fecha seleccionada y la hora seleccionada en la zona horaria local
    const selectedDate = new Date(`${this.data.fecha}T${this.data.hora}:00`);
    
    // Obtener la fecha y hora actuales
    const now = new Date();

    // Verificación de que todos los campos están llenos
    if (!this.data.asunto || !this.data.fecha || !this.data.hora) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios.'
      });
      return;
    }

    // Verificación de que la fecha y hora sean futuras
    if (selectedDate <= now) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha y hora deben ser futuras.'
      });
      return;
    }

    this.dialogRef.close(this.data);
  }


  onCancelClick(): void {
    this.dialogRef.close();
  }
}
