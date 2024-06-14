import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-inf',
  templateUrl: './edit-inf.component.html',
  styleUrls: ['./edit-inf.component.css']
})
export class EditInfComponent {
  informacion: string;

  constructor(
    public dialogRef: MatDialogRef<EditInfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.informacion = data.informacion;
  }

  save(): void {
    if (this.informacion !== undefined) {
      this.dialogRef.close(this.informacion);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
