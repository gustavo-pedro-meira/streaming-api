import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Streaming } from '../../streaming/entities/streaming.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Streaming, {
    eager: true,
  })
  @JoinTable({
    name: 'users_streaming_favorites',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'streaming_id' },
  })
  favorites: Streaming[];

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
