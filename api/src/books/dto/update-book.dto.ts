import {
  IsString,
  IsNotEmpty,
  IsISBN,
  IsInt,
  Min,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsOptional()
  @IsISBN()
  isbn?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalCopies?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  publishedYr?: number;

  @IsOptional()
  @IsUUID()
  genreId?: string;
}
