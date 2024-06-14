import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Hobby } from '../../../models/model';

@Component({
  selector: 'app-add-hobbies',
  templateUrl: './add-hobbies.component.html',
  styleUrls: ['./add-hobbies.component.css']
})
export class AddHobbiesComponent {
  hobbiesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddHobbiesComponent>
  ) {
    this.hobbiesForm = this.fb.group({
      hobby: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.hobbiesForm.valid) {
      const nuevoHobby: Hobby = { id: 0, nombre: this.hobbiesForm.value.hobby };
      this.dialogRef.close(nuevoHobby);
    }
  }
}
