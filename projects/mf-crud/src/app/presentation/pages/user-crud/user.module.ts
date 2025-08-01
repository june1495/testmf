import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCrudComponent } from './user-crud.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch  } from '@angular/common/http';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { UserEditComponent } from '../../components/user-edit/user-edit.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ApiKeyInterceptor } from '../../../../../../commons-lib/src/lib/utils/api-key.interceptor';
import { UserDeleteComponent } from '../../components/user-delete/user-delete.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
const routes:Routes = [{path:'', component:UserCrudComponent}]

@NgModule({
  declarations: [UserCrudComponent,UserTableComponent,UserEditComponent,UserDeleteComponent, UserCreateComponent
],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatLabel,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forChild(routes)
  ],
  providers:[]
})
export class UserModule { }
