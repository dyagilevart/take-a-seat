import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PlaceService } from './place.service';
import { Place } from '../schemas/place.schema';

const mockPlace = {
  owner: 'Owner 1',
  place: '001',
  temporary: false,
};

describe('PlaceService', () => {
  let service: PlaceService;
  let model: Model<Place>;

  const placesArray = [
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
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaceService,
        {
          provide: getModelToken('Place'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockPlace),
            constructor: jest.fn().mockResolvedValue(mockPlace),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlaceService>(PlaceService);
    model = module.get<Model<Place>>(getModelToken('Place'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all places', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(placesArray),
    } as any);
    const places = await service.findAll();
    expect(places).toEqual(placesArray);
  });

  it('should insert a new place', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        owner: 'Onwer 1',
        place: '001',
        temporary: false,
      } as any),
    );
    const newPlace = await service.create({
      owner: 'Onwer 1',
      place: '001',
      temporary: false,
    });
    expect(newPlace).toEqual(mockPlace);
  });
});
