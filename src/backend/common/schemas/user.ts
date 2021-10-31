import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string | null;

  @Prop()
  birthday: string | null;

  @Prop()
  email: string | null;

  @Prop()
  name: string | null;

  @Prop()
  gender: string | null;

  @Prop()
  snsId: string | null;

  @Prop()
  snsType: string | null;

  @Prop()
  profileUrl: string | null;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
