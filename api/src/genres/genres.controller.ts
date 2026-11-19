import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { GenresService } from './genres.service.js';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.genresService.create(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.genresService.update(id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
