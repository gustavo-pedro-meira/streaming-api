import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':userId/favorites')
  @HttpCode(HttpStatus.NO_CONTENT)
  addFavorite(
    @Param('userId') userId: string,
    @Body() addFavoriteDto: AddFavoriteDto,
  ) {
    return this.usersService.addFavorite(userId, addFavoriteDto.mediaId);
  }

  @Get(':userId/favorites')
  listFavorites(@Param('userId') userId: string) {
    return this.usersService.listFavorites(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('userId') userId: string, @Param('mediaId') mediaId: string) {
    return this.usersService.removeFavorites(userId, mediaId);
  }
}
