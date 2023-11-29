import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { PlaceService } from './place.service';

describe('Place Controller', () => {
  let controller: PlaceController;
  let service: PlaceService;
  const createPlaceDto: CreatePlaceDto = {
    owner: 'Owner 1',
    place: '001',
    temporary: false,
  };

  const mockPlace = {
    owner: 'Owner 1',
    place: '001',
    temporary: false,
    _id: 'an id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [
        {
          provide: PlaceService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                owner: 'Owner 1',
                place: '001',
                temporary: false,
              },
              {
                owner: 'Owner 2',
                place: '002',
                temporary: true,
              },
              {
                owner: 'Owner 3',
                place: '003',
                temporary: true,
              },
            ]),
            create: jest.fn().mockResolvedValue(createPlaceDto),
          },
        },
      ],
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
    service = module.get<PlaceService>(PlaceService);
  });

  describe('create()', () => {
    it('should create a new place', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockPlace);

      await controller.create(createPlaceDto);
      expect(createSpy).toHaveBeenCalledWith(createPlaceDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of places', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          owner: 'Owner 1',
          place: '001',
          temporary: false,
        },
        {
          owner: 'Owner 2',
          place: '002',
          temporary: true,
        },
        {
          owner: 'Owner 3',
          place: '003',
          temporary: true,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
