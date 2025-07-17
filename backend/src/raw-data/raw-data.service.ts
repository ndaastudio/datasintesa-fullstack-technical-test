import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { RawData, RawDataDocument } from './dto/schemas/raw-data.schema';

@Injectable()
export class RawDataService {
    constructor(@InjectModel(RawData.name) private rawDataModel: Model<RawDataDocument>) { }

    async processCsv(filePath: string): Promise<string> {
        const results = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', async (row) => {
                    try {
                        const objectName = row['Object Name'];
                        const resultTime = new Date(row['Result Time']);
                        const availDur = parseInt(row['L.Cell.Avail.Dur'], 10) || 0;

                        const enodebMatch = objectName.match(/eNodeB ID=(\d+)/);
                        const cellIdMatch = objectName.match(/Local Cell ID=(\d+)/);

                        if (!enodebMatch || !cellIdMatch) return;

                        const enodebId = enodebMatch[1];
                        const cellId = cellIdMatch[1];

                        await this.rawDataModel.updateOne(
                            { enodebId, cellId, resultTime },
                            { $setOnInsert: { enodebId, cellId, resultTime, availDur } },
                            { upsert: true }
                        );
                    } catch (err) {
                        console.error('Error parsing row:', err);
                    }
                })
                .on('end', () => {
                    fs.unlinkSync(filePath);
                    resolve('CSV processed successfully');
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }

    async getGraphData(enodebId: string, cellId: string) {
        const data = await this.rawDataModel.find({
            enodebId,
            cellId,
        }).sort({ resultTime: 1 });

        return data.map(item => ({
            resultTime: item.resultTime,
            availability: (item.availDur / 900) * 100
        }));
    }
}
