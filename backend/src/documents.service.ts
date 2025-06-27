import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { CreateDocumentDto } from './documents/dto/create-document.dto';
import { BoletoDocument } from './documents/documents.schema';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(BoletoDocument.name)
    private documentModel: Model<BoletoDocument>,
  ) {}

  async create(document: CreateDocumentDto): Promise<BoletoDocument> {
    const createdDoc = new this.documentModel(document);
    return createdDoc.save();
  }

  async findAll(): Promise<BoletoDocument[]> {
    return this.documentModel.find().exec();
  }

  async validateBoleto(file: Express.Multer.File): Promise<string> {
    const filePath = path.join(__dirname, '..', '..', 'uploads', file.filename);

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      if (fileContent.includes('23790')) {
        return 'Boleto do Bradesco válido.';
      } else if (fileContent.includes('34191')) {
        return 'Boleto do Itaú válido.';
      } else {
        return 'Boleto inválido ou não reconhecido.';
      }
    } catch (error) {
      return 'Erro ao ler o arquivo.';
    }
  }
}
