import { Injectable } from '@nestjs/common'; // Torna a classe injetável no NestJS
import { InjectModel } from '@nestjs/mongoose'; // Permite injetar modelos do Mongoose
import { Model } from 'mongoose'; // Tipo para modelos do Mongoose

import * as fs from 'fs'; // Módulo para trabalhar com arquivos no sistema de arquivos
import * as path from 'path'; // Módulo para manipular caminhos de diretórios

import { CreateDocumentDto } from './dto/create-document.dto'; // DTO para criar documentos
import { Boleto, BoletoDocument } from './documents.schema'; // Tipo retornado pelo schema do Mongoose

@Injectable() // Torna o serviço disponível para injeção de dependência
export class DocumentsService {
  // Injeção do modelo MongoDB (Mongoose) configurado no schema
  constructor(
    @InjectModel(Boleto.name)
    private documentModel: Model<BoletoDocument>, // Define o tipo do model injetado
  ) {}

  // Cria e salva um novo documento no banco
  async create(document: CreateDocumentDto): Promise<BoletoDocument> {
    const createdDoc = new this.documentModel(document);
    return createdDoc.save(); // Salva no MongoDB
  }

  
  // Valida o conteúdo de um boleto com base no conteúdo do arquivo enviado
  async validateBoleto(file: Express.Multer.File): Promise<string> {
    // Monta o caminho completo do arquivo
    const filePath = path.join(__dirname, '..', '..', 'uploads', file.filename);

    try {
      // Lê o conteúdo do arquivo como texto
      const fileContent = fs.readFileSync(filePath, 'utf8');

      // Lógica simples de validação com base no conteúdo
      if (fileContent.includes('23790')) {
        return 'Boleto do Bradesco válido.';
      } else if (fileContent.includes('34191')) {
        return 'Boleto do Itaú válido.';
      } else {
        return 'Boleto inválido ou não reconhecido.';
      }
    } catch (error) {
      return 'Erro ao ler o arquivo.'; // Caso ocorra algum erro na leitura
    }
  }
}
