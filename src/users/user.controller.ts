import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UserResponseInterface } from './types/userResponse.interface';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDTO);

    return this.userService.buildUserResponse(user);
  }

  @Get('/users')
  async findAll(): Promise<UserEntity[]> {
    const user = await this.userService.findAll();

    return user;
  }

  @Get('/user/:id')
  async findById(id: number): Promise<UserEntity> {
    const user = await this.userService.findById(id);

    return user;
  }
}
