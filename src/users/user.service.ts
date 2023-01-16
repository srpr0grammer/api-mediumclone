import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRespoitory: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDTO);
    return await this.userRespoitory.save(newUser);
  }

  generateToken(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildResponse(user: UserEntity): any {
    return {
      user: {
        ...user,
        token: this.generateToken(user),
      },
    };
  }

  //  async findByUser(id:number): Promise<UserEntity> {
  //   const user = this.userRespoitory.findOne()

  //   return user
  //  }
}
