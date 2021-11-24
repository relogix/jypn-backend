import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { dynamicException } from 'src/utils/exception.util';
import { fileservicePath } from 'src/utils/main.util';
import { FilenameDTO } from './fileservice.dto';
import { FileserviceService } from './fileservice.service';

@Controller('files')
export class FileserviceController {
  constructor(private readonly fileserviceService: FileserviceService) {}

  @Get('updates/thumbnails/:filename')
  async getUpdateThumbnail(
    @Param() { filename }: FilenameDTO,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.fileserviceService.getFile(
        `${fileservicePath}/updates/thumbnails/${filename}`,
        res,
      );
    } catch (error) {
      dynamicException(error);
    }
  }

  @Get('members/:filename')
  async getMember(
    @Param() { filename }: FilenameDTO,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return await this.fileserviceService.getFile(
        `${fileservicePath}/members/${filename}`,
        res,
      );
    } catch (error) {
      dynamicException(error);
    }
  }
}
