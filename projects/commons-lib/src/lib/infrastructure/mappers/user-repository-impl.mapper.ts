import { UserEntity } from "../../domain/entities/user.entity";
import { MapFrom } from "../../utils/map-from";
import { UserResponseDto } from "../dtos/response/user.dto";

export class UserImplRepositoryMapper extends MapFrom<UserResponseDto, UserEntity> {
  override mapFrom(param: UserResponseDto): UserEntity {
    return new UserEntity({
      page:param.page,
      per_page:param.per_page,
      total:param.total,
      total_pages:param.total_pages,
      data: param.data
    })
  }
}
