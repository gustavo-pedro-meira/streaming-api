import { Test, TestingModule } from '@nestjs/testing';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';

describe('StreamingController', () => {
  let controller: StreamingController;

  // SOLUÇÃO: Defina o mock aqui!
  const mockStreamingService = {
    findAll: jest.fn(() => {
      return Promise.resolve([{ title: 'Test Movie from Mock' }]);
    }),
    create: jest.fn((dto) => {
      return Promise.resolve({ id: 'a-uuid', ...dto });
    }),
    // Adicione mocks para findOne, update, remove, etc.
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingController],
      providers: [
        {
          provide: StreamingService,
          useValue: mockStreamingService, // Agora a variável existe
        },
      ],
    }).compile();

    controller = module.get<StreamingController>(StreamingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Exemplo de teste para o método findAll
  describe('findAll', () => {
    it('deve retornar uma lista de streamings', async () => {
      const result = await controller.findAll();
      expect(mockStreamingService.findAll).toHaveBeenCalled();
      expect(result).toEqual([{ title: 'Test Movie from Mock' }]);
    });
  });
});