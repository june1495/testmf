import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CommonsLibService, UserProfileEntity } from '@commons-lib';
import { firstValueFrom } from 'rxjs';

export interface UserProfileForm {
  id: FormControl<string>;
  email: FormControl<string>;
  first_name: FormControl<string>;
  last_name: FormControl<string>;
}
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit{
  form!: FormGroup<UserProfileForm>;

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserProfileEntity,
    private fb: NonNullableFormBuilder,
  ) {

  }
  ngOnInit(): void {
     this.form = this.fb.group({
      id: this.fb.control(this.data.id),
      email: this.fb.control(this.data.email, [Validators.required, Validators.email]),
      first_name: this.fb.control(this.data.first_name, Validators.required),
      last_name: this.fb.control(this.data.last_name, Validators.required),
    });
  }
 onSave() {
  if (this.form.invalid) {
    return; // no hace nada si es inválido
  }
  const value = this.form.getRawValue() as UserProfileEntity;
  this.dialogRef.close(value);
}

  onCancel(): void {
    this.dialogRef.close();
  }
}
