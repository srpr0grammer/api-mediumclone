import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
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

  //  async findByUser(id:number): Promise<UserEntity> {
  //   const user = this.userRespoitory.findOne()

  //   return user
  //  }
}
