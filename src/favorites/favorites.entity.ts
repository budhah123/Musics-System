import { Music } from "src/musics/musics.entity";
import { User } from "src/users/users.entity";
import { Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(()=> User, (user) => user.favorite)
  // user: User;

  // @ManyToOne(()=> Music, (music) => music.favorite)
  // music: Music;

  @Column()
  userId: string;

  @Column()
  musicId: string;

}