import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SelectionMusics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  musicsId: string;
}