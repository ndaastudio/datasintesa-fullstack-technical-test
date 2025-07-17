import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RawDataModule } from './raw-data/raw-data.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://03041182126001:8De8zFkeEMkYAJkQ@cluster0.cfoocbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    RawDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
