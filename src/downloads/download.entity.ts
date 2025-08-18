import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Download {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  musicId: string;
}