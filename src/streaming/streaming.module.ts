import { Module } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streaming } from './entities/streaming.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Streaming])],
  controllers: [StreamingController],
  providers: [StreamingService],
})
export class StreamingModule {}
