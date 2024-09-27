/**
 * 用户实体类
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true, type: "boolean" })
  isActive: boolean;

  @Column({ type: "date" })
  birthday: Date;

  @Column({ type: "enum", enum: ['m', 'w'] })
  sex: string;

  @Column()
  phone: string;

  @CreateDateColumn({ type: "timestamp" })
  createDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updateDate: Date;
}