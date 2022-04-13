import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   * endpoint that allows the user to log in
   *
   * @param loginDto
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.service.login(loginDto.username, loginDto.password);
  }
}
