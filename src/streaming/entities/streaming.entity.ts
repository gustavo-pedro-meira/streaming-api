import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StreamingType } from './streaming-type.entity';

@Entity()
export class Streaming {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: StreamingType;

  @Column()
  releaseYear: Date;

  @Column()
  genre: string;
}
