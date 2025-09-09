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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':userId/favorites')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Adicionar streaming aos favoritos do usuário' })
  @ApiResponse({ status: 204, description: 'Favorito adicionado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário ou mídia não encontrado.' })
  addFavorite(
    @Param('userId') userId: string,
    @Body() addFavoriteDto: AddFavoriteDto,
  ) {
    return this.usersService.addFavorite(userId, addFavoriteDto.mediaId);
  }

  @Get(':userId/favorites')
  @ApiOperation({ summary: 'Listar favoritos do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de favoritos do usuário.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  listFavorites(@Param('userId') userId: string) {
    return this.usersService.listFavorites(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover streaming dos favoritos do usuário' })
  @ApiResponse({ status: 204, description: 'Favorito removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário ou mídia não encontrado.' })
  remove(@Param('userId') userId: string, @Param('mediaId') mediaId: string) {
    return this.usersService.removeFavorites(userId, mediaId);
  }
}
