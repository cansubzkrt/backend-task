import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '../users/interface/user.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() loginDto: LoginDto, user: IUser, @Req() request) {
    return this.service.login(
      loginDto.username,
      loginDto.password,
      request.user,
    );
  }
}
