import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Updates } from 'src/entities/update.entity';
import { FileserviceService } from '../fileservice/fileservice.service';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';

@Module({
  imports: [TypeOrmModule.forFeature([Updates])],
  controllers: [UpdateController],
  providers: [UpdateService, FileserviceService],
  exports: [TypeOrmModule.forFeature([Updates]), UpdateService],
})
export class UpdateModule {}
