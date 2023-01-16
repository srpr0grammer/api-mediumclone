import { Controller, Get } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Controller('api')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/tags')
  async findAll(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }

  // @Get('/tag/:id')
  // async findById(id: number): Promise<TagEntity> {
  //   return await this.tagService.findById(id);
  // }
}
