import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll(genreId?: string, search?: string, page = 1, limit = 10) {
    const where = {
      ...(genreId && { genreId }),
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            author: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          genre: true,
        },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data: books,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title: dto.title,
        author: dto.author,
        isbn: dto.isbn,
        publishedYr: dto.publishedYr,
        totalCopies: dto.totalCopies,
        genreId: dto.genreId,
      },
      include: {
        genre: true,
      },
    });
  }

  async update(id: string, dto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: dto,
      include: {
        genre: true,
      },
    });
  }

  async remove(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return this.prisma.book.delete({
      where: { id },
    });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        genre: true,
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }
}
