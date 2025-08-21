import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SelectionMusics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  musicId: string;

  @Column({ nullable: true })
  deviceId: string;
}
