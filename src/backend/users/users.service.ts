import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../common/schemas/user';

import { InvalidUserIdException } from './exception/invalid-user-id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(body: User): Promise<User> {
    const user = new this.userModel({ ...body });
    const newUser = await user.save();
    return newUser;
  }

  async getAll(id: number): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return [...users];
  }

  async getUserById({ _id }: { _id: number }): Promise<User> {
    const user = await this.userModel.findOne({ _id }).exec();
    return user;
  }

  async getUserBySnsIdAndSnsType({ snsId, snsType }: { snsId: string; snsType: string }): Promise<User> {
    const user = await this.userModel
      .findOne({
        snsId,
        snsType,
      })
      .exec();
    return user;
  }

  async updateMyInfo(body): Promise<User> {
    const user = await this.userModel.findOne({ _id: body._id }).exec();
    const editUser = user.save();
    return editUser;
  }

  async deleteUser(user: User) {
    const result = await this.userModel.deleteOne({ _id: user._id }).exec();
    if (result.deletedCount === 0) {
      console.log('문제있음');
    }
  }

  async checkUser({ _id }: { _id: number }): Promise<User> {
    const user = await this.getUserById({ _id });
    if (!user) {
      throw new InvalidUserIdException();
    }
    return user;
  }

  async updateUser(body): Promise<User> {
    const user = await this.userModel.findOne({ _id: body._id }).exec();
    const editUser = user.save();
    return editUser;
  }
}
