import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @HttpCode(200)
  async getById(id: string) {
    const user = await this.userService.getById(id);

    return { 
      user,
    }
  }
}
