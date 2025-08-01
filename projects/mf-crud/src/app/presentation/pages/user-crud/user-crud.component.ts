import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonsLibService, UserProfileEntity } from '@commons-lib';
import { BehaviorSubject } from 'rxjs';
import { UserCreateComponent } from '../../components/user-create/user-create.component';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss',

})
export class UserCrudComponent implements OnInit{
    private usersSubject = new BehaviorSubject<UserProfileEntity[]>([]);
users$ = this.usersSubject.asObservable();
  constructor(public commonLibService:CommonsLibService,private dialog: MatDialog) {

  }
  async ngOnInit() {
    this.getUsers()
  }
   getUsers(){
  this.commonLibService.getUsers().subscribe(users => {
    this.usersSubject.next(users.data);
  });
}
  onUserEdited(edited: UserProfileEntity) {
    const current = this.usersSubject.value;
    const idx = current.findIndex(u => u.id === edited.id);
    if (idx !== -1) {
      const updated = [...current];
      updated[idx] = edited;
      this.usersSubject.next(updated);
      }
  }
  onUserDeleted(id: string) {
    const current = this.usersSubject.value;
    const updated = current.filter(u => u.id !== id);
    if(updated.length !== current.length) {
      this.usersSubject.next(updated);
    }
  }
  createUser(){
     const dialogRef = this.dialog.open(UserCreateComponent, {
         width: '400px',
      });
       dialogRef.afterClosed().subscribe(result => {
     if(result) {
      const current = this.usersSubject.value;
      const newUser:UserProfileEntity = new UserProfileEntity({id:current.length.toString(),...result})
         this.usersSubject.next([...current, newUser]);
      }
    });

  }
}
