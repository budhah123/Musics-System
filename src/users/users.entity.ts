import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity()
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  FullName: string;

  @Column({unique:true})
  email:string;

  @Column()
  password: string;

  @Column({default: 'users'})
  userType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}