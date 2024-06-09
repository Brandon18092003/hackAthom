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
    this.minDate = today.toISOString().split('T')[0]; // Esto asegura que minDate esté en el formato 'YYYY-MM-DD'
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
  
    // Convertir this.data.fecha a una cadena en formato 'YYYY-MM-DD'
    const selectedDateString = new Date(this.data.fecha).toISOString().split('T')[0];
  
    // Verificación de que la fecha seleccionada es hoy o en el futuro
    if (selectedDateString === this.minDate && selectedDate < now) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La hora seleccionada debe ser futura si la fecha es hoy.'
      });
      return;
    }
  
    if (selectedDate < now) {
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