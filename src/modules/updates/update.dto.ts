import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class IdDTO {
  @IsNotEmpty()
  @IsUUID()
  updateId: string;
}

export class CreateUpdateDTO {
  constructor(obj) {
    Object.assign(this, obj);
  }

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateUpdateDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
