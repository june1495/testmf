import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateComponent } from './user-create.component';
import { UserProfileEntity } from '@commons-lib';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UserCreateComponent>>;

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
      declarations: [UserCreateComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente y el formulario iniciar inválido', () => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBeFalse();
  });

  it('debería tener errores si campos requeridos están vacíos', () => {
    component.form.setValue({
      id: '',
      email: '',
      first_name: '',
      last_name: '',
    });

    expect(component.form.controls.email.hasError('required')).toBeTrue();
    expect(component.form.controls.first_name.hasError('required')).toBeTrue();
    expect(component.form.controls.last_name.hasError('required')).toBeTrue();
    expect(component.form.valid).toBeFalse();
  });

  it('debería marcar email inválido', () => {
    component.form.patchValue({
      email: 'no-es-email',
      first_name: 'Nombre',
      last_name: 'Apellido',
      id: '',
    });
    expect(component.form.controls.email.hasError('email')).toBeTrue();
    expect(component.form.valid).toBeFalse();
  });

  it('debería cerrar el diálogo con un usuario válido al guardar', () => {
    component.form.setValue({
      id: '',
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
    });

    expect(component.form.valid).toBeTrue();

    component.save();

    expect(dialogRefSpy.close).toHaveBeenCalledTimes(1);
    const arg = dialogRefSpy.close.calls.first().args[0] as UserProfileEntity;
    expect(arg.email).toBe('test@example.com');
    expect(arg.first_name).toBe('Test');
    expect(arg.last_name).toBe('User');
  });

  it('no debería cerrar con datos si el formulario es inválido al guardar', () => {
    component.form.setValue({
      id: '',
      email: 'invalid-email',
      first_name: '',
      last_name: '',
    });

    expect(component.form.valid).toBeFalse();
    component.save();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('debería cerrar el diálogo sin datos al cancelar', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });
});
