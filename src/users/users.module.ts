import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingModule } from 'src/streaming/streaming.module';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), StreamingModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
