import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Habilidad } from '../../../models/model';

@Component({
  selector: 'app-add-habilidades',
  templateUrl: './add-habilidades.component.html',
  styleUrls: ['./add-habilidades.component.css']
})
export class AddHabilidadesComponent {
  habilidadesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHabilidadesComponent>
  ) {
    this.habilidadesForm = this.fb.group({
      habilidad: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.habilidadesForm.valid) {
      const nuevaHabilidad: Habilidad = { id: 0, nombre: this.habilidadesForm.value.habilidad };
      this.dialogRef.close(nuevaHabilidad);
    }
  }
}
