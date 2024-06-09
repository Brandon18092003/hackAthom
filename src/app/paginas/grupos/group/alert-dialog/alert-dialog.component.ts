import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.data.fecha = null; // Inicializa la fecha como null para que el campo esté vacío
  }

  onSaveClick(): void {
    if (!this.data.asunto || !this.data.fecha || !this.data.hora) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios.'
      });
      return;
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

    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
