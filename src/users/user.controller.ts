import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  HttpException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDTO } from './dto/login.user.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDTO);

    return this.userService.buildUserResponse(user);
  }

  @Post('/users/login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginDTO: LoginUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginDTO);

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
