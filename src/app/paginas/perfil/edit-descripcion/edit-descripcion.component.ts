import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-descripcion',
  templateUrl: './edit-descripcion.component.html',
  styleUrls: ['./edit-descripcion.component.css']
})
export class EditDescripcionComponent {
  descripcion: string;

  constructor(
    public dialogRef: MatDialogRef<EditDescripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.descripcion = data.descripcion;
    console.log(this.descripcion);
  }

  save(): void {
    this.dialogRef.close(this.descripcion);
    console.log(this.descripcion);
  }

  close(): void {
    this.dialogRef.close();
  }
}