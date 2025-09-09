import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { StreamingService } from '../streaming/streaming.service';
import { Streaming } from '../streaming/entities/streaming.entity';
import { StreamingType } from '../streaming/entities/streaming.entity';
import { CreateUserDto } from './dto/create-user.dto';

const mockStreaming: Streaming = {
  id: 'streaming-uuid-123',
  title: 'Filme Mock',
  description: 'Um filme para testes',
  type: 'Movie',
  releaseYear: new Date(),
  genre: 'Aventura',
};

const mockUser: User = {
  id: 'user-uuid-456',
  username: 'Test User',
  email: 'test@example.com',
  password: 'hashedpassword',
  favorites: [], 
};

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;
  let streamingService: StreamingService;

  const mockUsersRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockStreamingService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: StreamingService,
          useValue: mockStreamingService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    streamingService = module.get<StreamingService>(StreamingService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'New User',
        email: 'new@example.com',
        password: 'password123',
      };

      mockUsersRepository.create.mockReturnValue(createUserDto);
      mockUsersRepository.save.mockResolvedValue({
        id: 'new-uuid',
        ...createUserDto,
        favorites: [],
      });

      const result = await service.create(createUserDto);

      expect(usersRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(usersRepository.save).toHaveBeenCalledWith(createUserDto);
      expect(result).toHaveProperty('id');
      expect(result.email).toBe(createUserDto.email);
    });
  });

  describe('addFavorite', () => {
    it('should add a favorite streaming to a user', async () => {
      // Cria uma cópia do usuário para este teste para não afetar outros
      const userWithEmptyFavorites = { ...mockUser, favorites: [] };

      mockStreamingService.findOne.mockResolvedValue(mockStreaming);
      mockUsersRepository.findOne.mockResolvedValue(userWithEmptyFavorites);
      mockUsersRepository.save.mockResolvedValue({
        ...userWithEmptyFavorites,
        favorites: [mockStreaming],
      });

      await service.addFavorite(mockUser.id, mockStreaming.id);

      expect(streamingService.findOne).toHaveBeenCalledWith(mockStreaming.id);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(usersRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          favorites: expect.arrayContaining([mockStreaming]),
        }),
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(
        service.addFavorite('invalid-user-id', mockStreaming.id),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if media is not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      mockStreamingService.findOne.mockResolvedValue(null);

      await expect(
        service.addFavorite(mockUser.id, 'invalid-media-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('listFavorites', () => {
    it("should return a user's list of favorites", async () => {
      const userWithFavorites = { ...mockUser, favorites: [mockStreaming] };
      mockUsersRepository.findOne.mockResolvedValue(userWithFavorites);

      const result = await service.listFavorites(mockUser.id);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(result).toEqual([mockStreaming]);
      expect(result.length).toBe(1);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);
      await expect(service.listFavorites('invalid-user-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeFavorites', () => {
    it('should remove a favorite from a user', async () => {
      const userWithFavorites = { ...mockUser, favorites: [mockStreaming] };
      mockUsersRepository.findOne.mockResolvedValue(userWithFavorites);
      mockUsersRepository.save.mockResolvedValue({
        ...mockUser,
        favorites: [],
      });

      await service.removeFavorites(mockUser.id, mockStreaming.id);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
      expect(usersRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          favorites: [],
        }),
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(
        service.removeFavorites('invalid-user-id', mockStreaming.id),
      ).rejects.toThrow(NotFoundException);
    });
  });
});