import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('updates')
export class Updates {
  @PrimaryGeneratedColumn('uuid')
  updateId: string;

  @Column()
  updateCode: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column()
  isActive: boolean;
}
