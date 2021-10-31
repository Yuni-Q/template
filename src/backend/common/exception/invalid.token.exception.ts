import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const status = HttpStatus.BAD_REQUEST;
const statusCode = 1100;
const message = '올바르지 못한 토큰 입니다.';

export class InvalidTokenException extends HttpException {
  @ApiProperty({
    example: message,
    description: '에러 메시지',
    required: true,
  })
  public message = message;

  constructor() {
    super({ statusCode, message }, status);
  }
}
