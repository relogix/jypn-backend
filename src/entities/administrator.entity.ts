import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('administrators')
export class Administrators {
  @PrimaryGeneratedColumn('uuid')
  adminId: string;

  @Column()
  adminName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  isSuperadmin: boolean;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column()
  isActive: boolean;
}
