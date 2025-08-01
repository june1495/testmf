import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableComponent } from './user-table.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserProfileEntity } from '@commons-lib';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

describe('UserTableComponent', () => {
  let fixture: ComponentFixture<UserTableComponent>;
  let component: UserTableComponent;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const sampleUsers: UserProfileEntity[] = [
    {
      id: '1',
      email: 'a@example.com',
      first_name: 'Alice',
      last_name: 'Smith',
    } as UserProfileEntity,
    {
      id: '2',
      email: 'b@example.com',
      first_name: 'Bob',
      last_name: 'Jones',
    } ,
  ];

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
await TestBed.configureTestingModule({
  declarations: [UserTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    NoopAnimationsModule,
  ],
  providers: [{ provide: MatDialog, useValue: matDialogSpy }],
  schemas: [NO_ERRORS_SCHEMA],
}).compileComponents();

    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    component.data = [...sampleUsers];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should emit editUser when edit dialog returns a user', () => {
    const edited: UserProfileEntity = {
      id: '1',
      email: 'edited@example.com',
      first_name: 'AliceEdited',
      last_name: 'SmithEdited',
    }  ;

    // Mock dialog open to return an afterClosed observable with the edited user
    const dialogRefMock: Partial<MatDialogRef<any>> = {
      afterClosed: () => of(edited),
    };
    matDialogSpy.open.and.returnValue(dialogRefMock as MatDialogRef<any>);

    const spyEmit = spyOn(component.editUser, 'emit');

    component.onEdit(sampleUsers[0]);

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith(edited);
  });

  it('should not emit editUser when edit dialog returns undefined', () => {
    const dialogRefMock: Partial<MatDialogRef<any>> = {
      afterClosed: () => of(undefined),
    };
    matDialogSpy.open.and.returnValue(dialogRefMock as MatDialogRef<any>);

    const spyEmit = spyOn(component.editUser, 'emit');

    component.onEdit(sampleUsers[0]);

    expect(spyEmit).not.toHaveBeenCalled();
  });

  it('should emit deleteUser when delete dialog confirms', () => {
    const dialogRefMock: Partial<MatDialogRef<any>> = {
      afterClosed: () => of(true),
    };
    matDialogSpy.open.and.returnValue(dialogRefMock as MatDialogRef<any>);

    const spyEmit = spyOn(component.deleteUser, 'emit');

    component.onDelete(sampleUsers[1]);

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith(sampleUsers[1].id);
  });

  it('should not emit deleteUser when delete dialog is cancelled', () => {
    const dialogRefMock: Partial<MatDialogRef<any>> = {
      afterClosed: () => of(false),
    };
    matDialogSpy.open.and.returnValue(dialogRefMock as MatDialogRef<any>);

    const spyEmit = spyOn(component.deleteUser, 'emit');

    component.onDelete(sampleUsers[1]);

    expect(spyEmit).not.toHaveBeenCalled();
  });
});
