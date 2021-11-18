import { IsNotEmpty, IsString } from 'class-validator';

export class FilenameDTO {
  @IsNotEmpty()
  @IsString()
  filename: string;
}
