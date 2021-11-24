import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from 'src/entities/member.entity';
import { MemberService } from './member.service';
import { MemberController } from './members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Members])],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [TypeOrmModule.forFeature([Members]), MemberService],
})
export class MemberModule {}
