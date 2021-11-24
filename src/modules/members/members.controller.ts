import { Controller, Get } from '@nestjs/common';
import { dynamicException } from 'src/utils/exception.util';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getMembers(): Promise<any> {
    try {
      return await this.memberService.getMembers();
    } catch (error) {
      dynamicException(error);
    }
  }
}
