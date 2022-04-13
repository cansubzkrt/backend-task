import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from "./interface/jwt-payload.interface";
import { IUser } from "../users/interface/user.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async login(username: string, password: string, user: IUser): Promise<any> {
    const checkUser = await this.validateUser(username, password);
    if (!checkUser) {
      throw new BadRequestException('User information is wrong');
    }
    const payload: IJwtPayload = { username: user.username, userId: user._id };
    return this.jwtService.sign(payload);
  }
}
