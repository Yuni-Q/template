import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { User } from 'src/backend/common/schemas/user';

export class UserDto extends ResponseDto {
  @ApiProperty({
    type: User,
  })
  public data: User;
}
