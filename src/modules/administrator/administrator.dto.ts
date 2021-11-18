import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  rememberMe: boolean;
}

export class VerifyTokenDTO {
  @IsNotEmpty()
  @IsString()
  token: string;
}
