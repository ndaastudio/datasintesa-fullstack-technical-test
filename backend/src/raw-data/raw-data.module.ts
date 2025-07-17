import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RawDataService } from './raw-data.service';
import { RawDataController } from './raw-data.controller';
import { RawData, RawDataSchema } from './dto/schemas/raw-data.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: RawData.name, schema: RawDataSchema }])],
    providers: [RawDataService],
    controllers: [RawDataController],
})
export class RawDataModule { }
