import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { createConnection } from 'mongoose';

import { InvalidTokenException } from '../exception/invalid.token.exception';
import { RequireTokenException } from '../exception/require.token.exception';
import { User, UserSchema } from '../schemas/user';

export const TokenUserId = createParamDecorator(async (data: unknown, ctx: ExecutionContext): Promise<string> => {
  const request = ctx.switchToHttp().getRequest();
  let token = request.headers.authorization as string;
  if (!token) {
    throw new RequireTokenException();
  }
  if ((token as string).startsWith('Bearer ')) {
    token = token.slice(7);
  }
  let result;
  try {
    result = (await jwt.verify(token, process.env.privateKey as string)) as {
      user: {
        _id: number;
      };
    };
  } catch (e) {
    console.log('token.user.id.decorator token1', token);
    console.log(e);
    throw new InvalidTokenException();
  }

  if (typeof result === 'object' && (!('user' in result) || !result.user._id)) {
    console.log('token.user.id.decorator token2', token);
    throw new InvalidTokenException();
  }

  const con = createConnection(process.env.MONGODB_URI);
  const userModel = con.model(User.name, UserSchema);
  const user = await userModel.findOne({ _id: result.user._id }).exec();

  if (!user?._id) {
    throw new InvalidTokenException();
  }
  return result.user._id as string;
});
