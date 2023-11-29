import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlaceModule } from './PlaceModule/place.module';
import databaseConfig from './config/db.config';
import { DatabaseModule } from './DatabaseModule/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    DatabaseModule,
    PlaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
