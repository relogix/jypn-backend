import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('members')
export class Members {
  @PrimaryGeneratedColumn('uuid')
  memberId: string;

  @Column()
  nickname: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  koreanName: string;

  @Column()
  birthdate?: Date;

  @Column()
  birthPlace: string;

  @Column()
  memberRole: string;
}
