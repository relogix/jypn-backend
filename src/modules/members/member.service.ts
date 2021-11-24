import { Injectable } from '@nestjs/common';
import { Members } from 'src/entities/member.entity';
import { Connection } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(private connection: Connection) {}

  async getMembers() {
    // Get Members
    let members = await this.connection
      .getRepository(Members)
      .createQueryBuilder('member')
      .orderBy('birthdate', 'ASC')
      .getMany();

    // Add Image URL
    members = members.map((member) => ({
      ...member,
      previewImg: `${
        process.env.HOST
      }/files/members/preview_${member.nickname.toLowerCase()}.jpg`,
      images: `${
        process.env.HOST
      }/files/members/${member.nickname.toLowerCase()}#`
        .repeat(3)
        .split('#')
        .filter((url) => !!url)
        .map((url, iUrl) => `${url}_${iUrl + 1}.jpg`),
    }));

    return { members };
  }
}
