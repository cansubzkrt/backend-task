import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  /**
   * user is registering
   *
   * @param createUserDto
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.UsersService.create(createUserDto);
  }
}
