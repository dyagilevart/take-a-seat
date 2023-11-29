import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlaceDocument = HydratedDocument<Place>;

@Schema()
export class Place {
  @Prop({ required: true })
  owner: string;

  @Prop()
  place: string;

  @Prop({ default: true })
  temporary: boolean;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
