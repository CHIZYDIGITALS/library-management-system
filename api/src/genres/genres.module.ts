import { Module } from '@nestjs/common';
import { GenresService } from './genres.service.js';
import { GenresController } from './genres.controller.js';

@Module({
  providers: [GenresService],
  controllers: [GenresController]
})
export class GenresModule {}
