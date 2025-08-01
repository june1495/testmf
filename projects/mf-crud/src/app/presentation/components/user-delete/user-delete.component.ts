import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserProfileEntity } from '@commons-lib';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})
export class UserDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<UserDeleteComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: UserProfileEntity
  ) {}
    onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
