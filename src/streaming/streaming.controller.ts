import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StreamingService } from './streaming.service';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';
import { Streaming } from './entities/streaming.entity';


@ApiTags('streamings')
@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo filme ou série' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.', type: Streaming })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  create(@Body() createStreamingDto: CreateStreamingDto) {
    return this.streamingService.create(createStreamingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os streaming' })
  @ApiResponse({ status: 200, description: 'Lista de streaming.', type: [Streaming] })
  findAll() {
    return this.streamingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um streaming pelo ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do streaming.', type: Streaming })
  @ApiResponse({ status: 404, description: 'Streaming não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.streamingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um streaming' })
  @ApiResponse({ status: 200, description: 'Streaming atualizado com sucesso.', type: Streaming })
  @ApiResponse({ status: 404, description: 'Streaming não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateStreamingDto: UpdateStreamingDto,
  ) {
    return this.streamingService.update(id, updateStreamingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um streaming' })
  @ApiResponse({ status: 204, description: 'Streaming removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Streaming não encontrado.' })
  remove(@Param('id') id: string) {
    return this.streamingService.remove(id);
  }
}
