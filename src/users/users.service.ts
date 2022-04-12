import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDoc } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDoc> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    const { email, username } = createUserDto;

    const checkUser = await this.userModel.findOne({ email, username }).exec();

    if (checkUser) {
      throw new BadRequestException('User already exist');
    }
    return new this.userModel({ ...createUserDto, password: password }).save();
  }
}
