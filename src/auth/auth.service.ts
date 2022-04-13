import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * We get access token while the user is logging in
   *
   * @param username
   * @param password
   */
  async login(username: string, password: string): Promise<any> {
    const payload = { username: username, password: password };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1day',
      }),
    };
  }

  /**
   * We check the password we have had by comparing
   *
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new BadRequestException('User not found');
  }
}
