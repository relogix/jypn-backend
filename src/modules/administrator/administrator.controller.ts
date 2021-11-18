import { Body, Controller, Get, Post } from '@nestjs/common';
import { dynamicException } from 'src/utils/exception.util';
import { LoginDTO, VerifyTokenDTO } from './administrator.dto';
import { AdministratorService } from './administrator.service';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post('login')
  async login(@Body() body: LoginDTO): Promise<any> {
    try {
      return await this.administratorService.login(body);
    } catch (error) {
      dynamicException(error);
    }
  }

  @Post('verify-token')
  async verifyToken(@Body() body: VerifyTokenDTO): Promise<any> {
    try {
      return await this.administratorService.verifyToken(body);
    } catch (error) {
      dynamicException(error);
    }
  }
}
