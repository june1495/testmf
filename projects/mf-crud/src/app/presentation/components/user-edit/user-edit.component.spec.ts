import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditComponent } from './user-edit.component';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserProfileEntity } from '@commons-lib';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('UserEditComponent', () => {
  let fixture: ComponentFixture<UserEditComponent>;
  let component: UserEditComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UserEditComponent>>;

  const mockUser: UserProfileEntity = new UserProfileEntity({id:"123",email:"test@example.com",first_name:"Franco",last_name:"Melgar"})

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
     MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatDialogModule,
      ],
      declarations: [UserEditComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockUser },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse y poblar el formulario con los datos entrantes', () => {
    expect(component).toBeTruthy();
    expect(component.form.value.email).toBe(mockUser.email);
    expect(component.form.value.first_name).toBe(mockUser.first_name);
    expect(component.form.value.last_name).toBe(mockUser.last_name);
    expect(component.form.valid).toBeTrue();
  });

  it('debería invalidar el formulario si falta nombre, apellido o email inválido', () => {
    component.form.controls.first_name.setValue('');
    component.form.controls.last_name.setValue('');
    component.form.controls.email.setValue('not-an-email');
    expect(component.form.valid).toBeFalse();
    expect(component.form.controls.email.hasError('email')).toBeTrue();
    expect(component.form.controls.first_name.hasError('required')).toBeTrue();
    expect(component.form.controls.last_name.hasError('required')).toBeTrue();
  });

  it('onSave debe cerrar el diálogo con el valor actualizado si el formulario es válido', async () => {
    component.form.patchValue({
      email: 'updated@example.com',
      first_name: 'Updated',
      last_name: 'Name',
    });

    expect(component.form.valid).toBeTrue();
     component.onSave();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(jasmine.objectContaining({
      email: 'updated@example.com',
      first_name: 'Updated',
      last_name: 'Name',
    }));
  });

  it('onSave no debería cerrar con datos si el formulario es inválido', async () => {
    component.form.patchValue({
      email: 'bad-email',
      first_name: '',
      last_name: '',
    });
    expect(component.form.valid).toBeFalse();
     component.onSave();

  expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
