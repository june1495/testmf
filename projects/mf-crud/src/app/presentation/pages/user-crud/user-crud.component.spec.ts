import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserCrudComponent } from './user-crud.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, of, throwError } from 'rxjs';
import { CommonsLibService, UserEntity, UserProfileEntity } from '@commons-lib';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserCrudComponent', () => {
  let fixture: ComponentFixture<UserCrudComponent>;
  let component: UserCrudComponent;
  let commonsLibServiceMock: jasmine.SpyObj<CommonsLibService>;
  let matDialogMock: jasmine.SpyObj<MatDialog>;

  const mockApiResponse:UserEntity = {
    page :1,
    per_page : 6,
    total : 0,
    total_pages : 0,
    data: [
      { id: '1', email: 'a@x.com', first_name: 'Alice', last_name: 'A' },
      { id: '2', email: 'b@x.com', first_name: 'Bob', last_name: 'B' },
    ]  as UserProfileEntity[],
  };

  beforeEach(async () => {
    commonsLibServiceMock = jasmine.createSpyObj('CommonsLibService', ['getUsers']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [UserCrudComponent],
      providers: [
        { provide: CommonsLibService, useValue: commonsLibServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], // para evitar declarar componentes hijos / material
    }).compileComponents();

    fixture = TestBed.createComponent(UserCrudComponent);
    component = fixture.componentInstance;
  });
it('should load users on init and push into subject', async () => {
  const apiResponse: UserEntity = {
        page :1,
    per_page : 6,
    total : 0,
    total_pages : 0,
    data: [
      { id: '1', email: 'a@x.com', first_name: 'Alice', last_name: 'A' },
      { id: '2', email: 'b@x.com', first_name: 'Bob', last_name: 'B' },
    ],
  };

  commonsLibServiceMock.getUsers.and.returnValue(of(apiResponse));

  fixture.detectChanges(); // dispara ngOnInit y carga

  const value = await firstValueFrom(component.users$); // espera el último emitido

  expect(commonsLibServiceMock.getUsers).toHaveBeenCalled();
  expect(value).toEqual(apiResponse.data);
});

  it('should handle error from getUsers without throwing', () => {
    commonsLibServiceMock.getUsers.and.returnValue(throwError(() => new Error('fail')));

    expect(() => fixture.detectChanges()).not.toThrow();

    let value: UserProfileEntity[] | undefined;
    component.users$.subscribe(u => (value = u));

    expect(value).toEqual([]); // default BehaviorSubject starts empty
  });

  it('should update a user when onUserEdited is called', () => {
    // seed initial
    commonsLibServiceMock.getUsers.and.returnValue(of(mockApiResponse));
    fixture.detectChanges();

    const edited: UserProfileEntity = {
      id: '1',
      email: 'a@x.com',
      first_name: 'AliceEdited',
      last_name: 'A',
    } as unknown as UserProfileEntity;

    component.onUserEdited(edited);

    let value: UserProfileEntity[] | undefined;
    component.users$.subscribe(u => (value = u));

    expect(value![0].first_name).toBe('AliceEdited');
  });

  it('should remove a user when onUserDeleted is called', () => {
    commonsLibServiceMock.getUsers.and.returnValue(of(mockApiResponse));
    fixture.detectChanges();

    component.onUserDeleted('2');

    let value: UserProfileEntity[] | undefined;
    component.users$.subscribe(u => (value = u));

    expect(value!.length).toBe(1);
    expect(value![0].id).toBe('1');
  });

  it('should add a new user when createUser receives result', fakeAsync(() => {
    commonsLibServiceMock.getUsers.and.returnValue(of(mockApiResponse));
    fixture.detectChanges();

    // mock dialog ref that returns a new user
    const newUserPartial = {
      email: 'new@x.com',
      first_name: 'New',
      last_name: 'User',
    };
    const dialogRefMock: Partial<MatDialogRef<any>> = {
      afterClosed: () => of(newUserPartial),
    };
    matDialogMock.open.and.returnValue(dialogRefMock as MatDialogRef<any>);

    component.createUser();
    tick(); // resolver subscripción

    let value: UserProfileEntity[] | undefined;
    component.users$.subscribe(u => (value = u));

    expect(value!.length).toBe(3);
    // el nuevo usuario tendrá id igual a current.length (2) como string
    const added = value!.find(u => u.email === 'new@x.com')!;
    expect(added.first_name).toBe('New');
    expect(added.id).toBe('2'); // index previo length =2 -> id '2'
  }));

  it('should not add user if dialog result is undefined', fakeAsync(() => {
    commonsLibServiceMock.getUsers.and.returnValue(of(mockApiResponse));
    fixture.detectChanges();

    const dialogRefMock: Partial<MatDialogRef<any>> = {
      afterClosed: () => of(undefined),
    };
    matDialogMock.open.and.returnValue(dialogRefMock as MatDialogRef<any>);

    component.createUser();
    tick();

    let value: UserProfileEntity[] | undefined;
    component.users$.subscribe(u => (value = u));

    expect(value!.length).toBe(2);
  }));
});
