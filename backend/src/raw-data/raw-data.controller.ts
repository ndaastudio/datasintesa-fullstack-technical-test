import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RawDataService } from './raw-data.service';
import { diskStorage } from 'multer';

@Controller('raw-data')
export class RawDataController {
    constructor(private readonly rawDataService: RawDataService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('files', {
        storage: diskStorage({ destination: './uploads', filename: (req, file, cb) => cb(null, file.originalname) })
    }))
    async uploadCsv(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('No file uploaded');
        return await this.rawDataService.processCsv(file.path);
    }

    @Get('graph')
    async getGraph(
        @Query('enodebId') enodebId: string,
        @Query('cellId') cellId: string,
    ) {
        return this.rawDataService.getGraphData(enodebId, cellId);
    }
}
