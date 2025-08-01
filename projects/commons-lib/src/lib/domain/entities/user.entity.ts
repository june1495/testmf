import { IUserEntity, IUserProfileEntity } from "../interfaces/user.interface";

export class UserProfileEntity {
  id: string = '';
  email: string = '';
  first_name:string = '';
  last_name: string = ""
  constructor(init:IUserProfileEntity) {
    Object.assign(this, init);
  }
}
export class UserEntity {
  page:number= 1
  per_page:number = 6
  total:number = 0
  total_pages:number = 0;
  data:UserProfileEntity[] = []
  constructor(init:IUserEntity) {
    Object.assign(this, init);
  }
}
