import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/backend/users/users.service';

import { User, UserSchema } from '../common/schemas/user';

import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [SigninController],
  providers: [SigninService, UsersService],
})
export class SigninModule {}
