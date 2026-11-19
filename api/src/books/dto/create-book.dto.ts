import {
  IsString,
  IsNotEmpty,
  IsISBN,
  IsInt,
  Min,
  IsUUID,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsISBN()
  isbn: string;

  @IsInt()
  @Min(1)
  totalCopies: number;

  @IsInt()
  @Min(1)
  publishedYr: number;

  @IsUUID()
  genreId: string;
}
