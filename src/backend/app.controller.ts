import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UndefinedToNullInterceptor } from './common/interceptors/undefined.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('참고')
@Controller()
export class AppController {
  @Get('health')
  getHealth(): any {
    return 'OK';
  }
}
