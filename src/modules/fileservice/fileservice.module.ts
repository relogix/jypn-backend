import { Module } from '@nestjs/common';
import { FileserviceController } from './fileservice.controller';
import { FileserviceService } from './fileservice.service';

@Module({
  controllers: [FileserviceController],
  providers: [FileserviceService],
})
export class FileserviceModule {}
