import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdministratorModule } from './modules/administrator/administrator.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileserviceModule } from './modules/fileservice/fileservice.module';
import { MemberModule } from './modules/members/member.module';
import { UpdateModule } from './modules/updates/update.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    FileserviceModule,
    AdministratorModule,
    UpdateModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
