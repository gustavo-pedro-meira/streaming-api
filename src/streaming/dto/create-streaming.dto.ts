import { StreamingType } from '../entities/streaming-type.entity';
import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreateStreamingDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum()
  @IsNotEmpty()
  type: StreamingType;

  @IsDateString()
  @IsNotEmpty()
  releaseYear: Date;

  @MinLength(3)
  @IsString()
  @IsNotEmpty(StreamingType)
  genre: string;
}
