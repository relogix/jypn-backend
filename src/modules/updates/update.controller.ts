import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate, validateOrReject } from 'class-validator';
import { Request } from 'express';
import { dynamicException } from 'src/utils/exception.util';
import { SearchDTO } from 'src/utils/global-dto.util';
import { CreateUpdateDTO, IdDTO, UpdateUpdateDTO } from './update.dto';
import { UpdateService } from './update.service';

@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Get('search')
  async search(@Query() queryParam: SearchDTO): Promise<any> {
    try {
      return await this.updateService.search(queryParam);
    } catch (error) {
      dynamicException(error);
    }
  }

  @Get('find/update-code/:updateCode')
  async findByUpdateCode(
    @Param('updateCode') updateCode: string,
  ): Promise<any> {
    try {
      return await this.updateService.findByUpdateCode(updateCode);
    } catch (error) {
      dynamicException(error);
    }
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    @Body() body: { data: string },
    @UploadedFile() thumbnail: Express.Multer.File,
  ): Promise<any> {
    try {
      const data = new CreateUpdateDTO(JSON.parse(body.data));

      return validateOrReject(data)
        .then(async () => {
          return await this.updateService.create(data, thumbnail);
        })
        .catch((err) => {
          console.error(err);
          return { errors: err };
        });
    } catch (error) {
      dynamicException(error);
    }
  }

  @Patch('update-data')
  @UseGuards(AuthGuard('jwt'))
  async updateData(
    @Query() queryParam: IdDTO,
    @Body() body: UpdateUpdateDTO,
  ): Promise<any> {
    try {
      return await this.updateService.update(queryParam, body);
    } catch (error) {
      dynamicException(error);
    }
  }

  @Patch('change-cover')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('thumbnail'))
  async changeCover(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Query() queryParam: IdDTO,
  ) {
    try {
      return await this.updateService.changeCover(queryParam, thumbnail);
    } catch (error) {
      dynamicException(error);
    }
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Query() queryParam: IdDTO): Promise<any> {
    try {
      return await this.updateService.delete(queryParam);
    } catch (error) {
      dynamicException(error);
    }
  }
}