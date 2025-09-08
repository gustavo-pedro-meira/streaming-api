import { StreamingType } from '../entities/streaming-type.entity';
import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateStreamingDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum()
  @IsNotEmpty()
  @IsOptional()
  type?: StreamingType;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  releaseYear?: Date;

  @MinLength(3)
  @IsString()
  @IsNotEmpty(StreamingType)
  @IsOptional()
  genre?: string;
}
