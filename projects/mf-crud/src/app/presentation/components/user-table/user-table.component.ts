import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileEntity } from '@commons-lib';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteComponent } from '../user-delete/user-delete.component';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  displayedColumns: string[] = ['email', 'first_name', 'last_name','actions'];
  @Input() data: UserProfileEntity[] = []
  @Output() editUser = new EventEmitter<UserProfileEntity>();
  @Output() deleteUser = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}
    onEdit(user: UserProfileEntity) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '400px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      this.editUser.emit(result);      }
    });
  }
    onDelete(user: UserProfileEntity) {
          const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '400px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
    this.deleteUser.emit(user.id);
     }
    });
  }

}
