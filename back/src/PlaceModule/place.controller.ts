import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { Place } from '../schemas/place.schema';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    await this.placeService.create(createPlaceDto);
  }

  @Get()
  async findAll(): Promise<Place[]> {
    return this.placeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Place> {
    return this.placeService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.placeService.delete(id);
  }
}
