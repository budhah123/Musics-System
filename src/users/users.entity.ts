import { Favorite } from "src/favorites/favorites.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
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

  // @OneToMany(() => (Favorite), (favorite) => favorite.user)
  // favorite: Favorite;
}