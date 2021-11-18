import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class SearchDTO {
  @IsOptional()
  @IsString()
  filter: string;

  @IsOptional()
  @IsString()
  sortBy: string;

  @IsOptional()
  @Transform(({ value }) => ('' + value).toUpperCase())
  @Matches(`^ASC|DESC$`, 'i', {
    message: `$property must be equal to ASC or DESC`,
  })
  sortType: 'ASC' | 'DESC';

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  page: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  limit: number;
}
