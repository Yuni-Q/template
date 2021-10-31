import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { User } from 'src/backend/common/schemas/user';
export class UsersDto extends ResponseDto {
  @ApiProperty({
    type: User,
    isArray: true,
  })
  public data: User[];
}
