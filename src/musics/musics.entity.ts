import { Favorite } from "src/favorites/favorites.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Music {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  genre: string;

  @Column()
  duration: string;

  @Column()
  thumbnail: string;

  @Column()
  musicFile: string;

  // @OneToMany(()=> Favorite, (favorite) => favorite.music)
  // favorite: Favorite;
}




