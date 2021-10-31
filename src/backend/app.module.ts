import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { EnvModule } from './common/env/env.module';
import { SigninModule } from './signin/signin.module';
import { UsersModule } from './users/users.module';
import { ViewsModule } from './views/views.module';

const imports = [ConfigModule.forRoot(), EnvModule, DatabaseModule, SigninModule, UsersModule, ViewsModule];
if (process.env.NODE_ENV !== 'test') {
  imports.push(MorganModule);
}

const providers = [
  AppService,
  ...(process.env.NODE_ENV === 'test'
    ? [
        AppService,
        {
          provide: APP_INTERCEPTOR,
          useClass: MorganInterceptor('combined'),
        },
      ]
    : []),
];

@Module({
  imports,
  controllers: [AppController],
  providers,
})
export class AppModule {}
