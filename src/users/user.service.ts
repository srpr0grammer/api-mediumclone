import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import {} from 'module';
import { JWT_SECRET } from '../config';
import { UserResponseInterface } from './types/userResponse.interface';
import { IsEmail } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRespoitory: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const userByEmail = await this.userRespoitory.findOne({
      where: { email: createUserDTO.email },
    });

    const userByUserName = await this.userRespoitory.findOne({
      where: { username: createUserDTO.username },
    });

    const newUser = new UserEntity();

    if (userByEmail || userByUserName) {
      throw new BadRequestException('Email or Username already exists');
    }

    Object.assign(newUser, createUserDTO);
    return await this.userRespoitory.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRespoitory.find();
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRespoitory.findOneBy({ id: id });
  }

  generateToken(user: UserEntity): any {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        hasPassword: user.hasPassword,
        token: this.generateToken(user),
      },
    };
  }
}
