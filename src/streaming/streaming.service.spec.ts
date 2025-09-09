import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StreamingService } from './streaming.service';
import { Streaming } from './entities/streaming.entity';
import { CreateStreamingDto } from './dto/create-streaming.dto';
import { UpdateStreamingDto } from './dto/update-streaming.dto';
import { StreamingType } from './entities/streaming-type.entity';

// Mock da entidade Streaming para usar nos testes
const mockStreaming: Streaming = {
  id: 'a-uuid-string',
  title: 'Test Movie',
  description: 'A great movie for testing purposes.',
  type: StreamingType.MOVIE, // Exemplo
  releaseYear: new Date('2025-01-01'),
  genre: 'Action',
};

describe('StreamingService', () => {
  let service: StreamingService;
  let repository: Repository<Streaming>;

  // Um mock para o repositório do TypeORM
  const mockStreamingRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest
      .fn()
      .mockImplementation((streaming) =>
        Promise.resolve({ id: 'a-uuid-string', ...streaming }),
      ),
    find: jest.fn().mockResolvedValue([mockStreaming]),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
      if (id === mockStreaming.id) {
        return Promise.resolve(mockStreaming);
      }
      return Promise.resolve(null);
    }),
    merge: jest
      .fn()
      .mockImplementation((target, source) => Object.assign(target, source)),
    remove: jest
      .fn()
      .mockImplementation((streaming) => Promise.resolve(streaming)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamingService,
        {
          provide: getRepositoryToken(Streaming),
          useValue: mockStreamingRepository,
        },
      ],
    }).compile();

    service = module.get<StreamingService>(StreamingService);
    repository = module.get<Repository<Streaming>>(
      getRepositoryToken(Streaming),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Teste para o método create()
  describe('create', () => {
    it('should create and save a new streaming entry', async () => {
      const createStreamingDto: CreateStreamingDto = {
        title: 'Test Movie',
        description: 'A great movie for testing purposes.',
        type: StreamingType.MOVIE,
        releaseYear: new Date('2025-01-01'),
        genre: 'Action',
      };

      const result = await service.create(createStreamingDto);
      expect(repository.create).toHaveBeenCalledWith(createStreamingDto);
      expect(repository.save).toHaveBeenCalledWith(createStreamingDto);
      expect(result).toEqual(mockStreaming);
    });
  });

  // Teste para o método findAll()
  describe('findAll', () => {
    it('should return an array of streamings', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockStreaming]);
    });
  });

  // Teste para o método findOne()
  describe('findOne', () => {
    it('should find a single streaming by its ID', async () => {
      const id = 'a-uuid-string';
      const result = await service.findOne(id);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(mockStreaming);
    });

    it('should return null if streaming is not found', async () => {
      const id = 'non-existing-uuid';
      const result = await service.findOne(id);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toBeNull();
    });
  });

  // Teste para o método update()
  describe('update', () => {
    it('should update a streaming entry and return it', async () => {
      const id = 'a-uuid-string';
      const updateStreamingDto: UpdateStreamingDto = { title: 'Updated Title' };

      const updatedStreaming = { ...mockStreaming, ...updateStreamingDto };
      jest.spyOn(repository, 'save').mockResolvedValue(updatedStreaming);

      const result = await service.update(id, updateStreamingDto);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.merge).toHaveBeenCalledWith(
        mockStreaming,
        updateStreamingDto,
      );
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(updateStreamingDto),
      );
      expect(result.title).toEqual('Updated Title');
    });

    it('should return null if the streaming to update is not found', async () => {
      const id = 'non-existing-uuid';
      const result = await service.update(id, { title: 'New Title' });
      expect(result).toBeNull();
    });
  });

  // Teste para o método remove()
  describe('remove', () => {
    it('should remove a streaming entry', async () => {
      const id = 'a-uuid-string';
      const result = await service.remove(id);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.remove).toHaveBeenCalledWith(mockStreaming);
      expect(result).toEqual(mockStreaming);
    });

    it('should return null if the streaming to remove is not found', async () => {
      const id = 'non-existing-uuid';
      const result = await service.remove(id);
      expect(result).toBeNull();
    });
  });
});