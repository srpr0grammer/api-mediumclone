import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/user')
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<UserEntity> {
    const user = await this.userService.createUser(createUserDTO);

    return this.userService.buildResponse(user);
  }
}
