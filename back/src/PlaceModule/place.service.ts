import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Place } from '../schemas/place.schema';
import { CreatePlaceDto } from '../dto/create-place.dto';

@Injectable()
export class PlaceService {
  constructor(@InjectModel(Place.name) private placeModel: Model<Place>) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const createdPlace = new this.placeModel(createPlaceDto);
    return createdPlace.save();
  }

  async findAll(): Promise<Place[]> {
    return this.placeModel.find().exec();
  }

  async findOne(id: string): Promise<Place> {
    return this.placeModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.placeModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
