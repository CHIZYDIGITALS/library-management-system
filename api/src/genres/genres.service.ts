import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.genre.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }

    return genre;
  }

  async create(name: string) {
    return this.prisma.genre.create({
      data: { name },
    });
  }

  async update(id: string, name: string) {
    await this.findOne(id);

    return this.prisma.genre.update({
      where: { id },
      data: { name },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    const booksCount = await this.prisma.book.count({
      where: { genreId: id },
    });

    if (booksCount > 0) {
      throw new ConflictException(
        'Cannot delete this genre because it contains books',
      );
    }

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
