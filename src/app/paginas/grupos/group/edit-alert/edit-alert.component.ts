import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

export interface EditAlertDialogData {
  asunto: string;
  fecha: Date;
  hora: string;
}

@Component({
  selector: 'app-edit-alert',
  templateUrl: './edit-alert.component.html',
  styleUrls: ['./edit-alert.component.css']
})
export class EditAlertComponent implements OnInit {

  minDate: string;

  constructor(
    public dialogRef: MatDialogRef<EditAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditAlertDialogData
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    if (!this.data.fecha) {
      this.data.fecha = new Date(); // Inicializa la fecha en hoy
    }
  }
  toDate(dateStruct: NgbDateStruct | null): Date | null {
    if (!dateStruct) {
      return null;
    }
    return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
  }

  onSaveClick(): void {
    const selectedDate = new Date(`${this.data.fecha}T${this.data.hora}:00`);
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

    // Verificar si la fecha y hora seleccionadas son futuras
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
