import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';
import { Repository } from 'typeorm';
import { Streaming } from './entities/streaming.entity';

@Injectable()
export class StreamingService {
  constructor(
    @InjectRepository(Streaming)
    private streamingRepository: Repository<Streaming>,
  ) {}

  create(createStreamingDto: CreateStreamingDto) {
    const streaming = this.streamingRepository.create(createStreamingDto);
    return this.streamingRepository.save(streaming);
  }

  findAll() {
    return this.streamingRepository.find();
  }

  findOne(id: string) {
    return this.streamingRepository.findOneBy({ id });
  }

  async update(id: string, updateStreamingDto: UpdateStreamingDto) {
    const streaming = await this.streamingRepository.findOneBy({ id });
    if (!streaming) return null;
    this.streamingRepository.merge(streaming, updateStreamingDto);
    return this.streamingRepository.save(streaming);
  }

  async remove(id: string) {
    const streaming = await this.streamingRepository.findOneBy({ id });
    if (!streaming) return null;
    return this.streamingRepository.remove(streaming);
  }
}
