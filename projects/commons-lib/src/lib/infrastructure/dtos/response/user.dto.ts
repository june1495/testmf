export interface UserProfileResponseDto {
  id: string;
  email: string;
  first_name:string;
  last_name: string
}
export interface UserResponseDto {
  page:number
  per_page:number
  total:number
  total_pages:number
  data:UserProfileResponseDto[]
}
