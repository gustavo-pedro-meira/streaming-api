import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { StreamingService } from 'src/streaming/streaming.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly streamingService: StreamingService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async addFavorite(userId: string, mediaId: string): Promise<void> {
    const media = await this.streamingService.findOne(mediaId);
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }
    if (!media) {
      throw new NotFoundException(`Mídia com ID ${mediaId} não encontrada.`);
    }

    user.favorites.push(media);
    await this.usersRepository.save(user);
  }

  async listFavorites(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }

    return user.favorites;
  }

  async removeFavorites(userId: string, mediaId: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
    }

    user.favorites = user.favorites.filter((media) => media.id !== mediaId);
    await this.usersRepository.save(user);
  }
}
