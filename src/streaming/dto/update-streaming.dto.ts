import { StreamingType } from '../entities/streaming-type.entity';
import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateStreamingDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(StreamingType)
  @IsNotEmpty()
  @IsOptional()
  type?: StreamingType;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  releaseYear?: Date;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  genre?: string;
}
