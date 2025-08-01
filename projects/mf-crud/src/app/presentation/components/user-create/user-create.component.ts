import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserProfileForm } from '../user-edit/user-edit.component';
import { UserProfileEntity } from '@commons-lib';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
form: FormGroup<UserProfileForm>;
  constructor(
    private fb: NonNullableFormBuilder,
    private dialogRef: MatDialogRef<UserCreateComponent>
  ) {
     this.form = this.fb.group<UserProfileForm>({
    id: this.fb.control(''),
    email: this.fb.control('', [Validators.required, Validators.email]),
    first_name: this.fb.control('', Validators.required),
    last_name: this.fb.control('', Validators.required),
  });
  }

  save(): void {
    if (this.form.valid) {
      const value = this.form.value
      const user: UserProfileEntity = new UserProfileEntity({id:'',email:value.email ?? '',first_name:value.first_name ?? '',last_name:value.last_name ?? ''})
      this.dialogRef.close(user);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
