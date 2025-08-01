import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteComponent } from './user-delete.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserProfileEntity } from '@commons-lib';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDeleteComponent', () => {
  let component: UserDeleteComponent;
  let fixture: ComponentFixture<UserDeleteComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UserDeleteComponent, boolean>>;

  const mockUser: UserProfileEntity = {
    id: '10',
    email: 'user@example.com',
    first_name: 'First',
    last_name: 'Last',
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [UserDeleteComponent],
           imports: [
        MatDialogModule,
        MatButtonModule,
        NoopAnimationsModule, // necesario para Material en tests
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockUser },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente y recibir datos', () => {
    expect(component).toBeTruthy();
    expect(component.data).toEqual(mockUser);
  });

  it('onConfirm debe cerrar el diálogo con true', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('onCancel debe cerrar el diálogo con false', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});
