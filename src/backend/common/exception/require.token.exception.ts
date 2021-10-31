import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const status = HttpStatus.BAD_REQUEST;
const message = '토큰이 필요합니다.';

export class RequireTokenException extends HttpException {
  @ApiProperty({
    example: status,
    description: '상태 코드',
    required: true,
  })
  public statusCode = status;

  @ApiProperty({
    example: message,
    description: '에러 메시지',
    required: true,
  })
  public message = message;

  constructor() {
    super({ statusCode: status, message }, status);
  }
}
