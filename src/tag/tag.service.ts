import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagReposiroty: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagReposiroty.find();
  }

  // async findById(id: number): Promise<TagEntity> {
  //   const tag = this.tagReposiroty.foin({ where: { id: id } });

  //   return tag;
  // }
}
