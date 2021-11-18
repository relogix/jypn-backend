import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrators } from 'src/entities/administrator.entity';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Administrators])],
  controllers: [AdministratorController],
  providers: [AdministratorService],
})
export class AdministratorModule {}
