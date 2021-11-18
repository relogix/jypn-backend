import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdministratorModule } from './modules/administrator/administrator.module';
import { FileserviceModule } from './modules/fileservice/fileservice.module';
import { UpdateModule } from './modules/updates/update.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    FileserviceModule,
    AdministratorModule,
    UpdateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
