import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserImplRepositoryMapper } from './infrastructure/mappers/user-repository-impl.mapper';
import { UserResponseDto } from './infrastructure/dtos/response/user.dto';
import { UserProfileEntity } from '@commons-lib';

@Injectable({
  providedIn: 'root'
})
export class CommonsLibService {
  baseUrl= "https://reqres.in/api/users"
  getUsersUrl:string= "https://reqres.in/api/users?per_page=20"
  userMapper = new UserImplRepositoryMapper()
  constructor(private http:HttpClient) { }

  getUsers() {
    return this.http.get<UserResponseDto>(this.getUsersUrl).pipe(
      map(res => this.userMapper.mapFrom(res)),
    );
  }

}
