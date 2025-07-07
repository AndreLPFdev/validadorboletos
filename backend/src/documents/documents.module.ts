// Importamos o módulo principal do NestJS
import { Module } from '@nestjs/common';

// Importamos MongooseModule para registrar o schema no MongoDB
import { MongooseModule } from '@nestjs/mongoose';

// Importamos o controller que lida com as rotas HTTP
import { DocumentsController } from './documents.controller';

// Importamos o service que contém a lógica de validação e criação dos boletos
import { DocumentsService } from './documents.service';

// Importamos a classe do schema e o schema real do boleto
import { Boleto, BoletoDocument, DocumentSchema } from './documents.schema';

@Module({
  // Aqui registramos o schema no Mongoose, associando a coleção "documents" ao nosso schema
  imports: [
    MongooseModule.forFeature([
      { name: Boleto.name, schema: DocumentSchema }
    ]),
  ],

  // Registramos o controller responsável pelas rotas de upload e validação
  controllers: [DocumentsController],

  // Registramos o service que vai lidar com a lógica de negócio (salvar no Mongo, validar, etc.)
  providers: [DocumentsService],
})
export class DocumentsModule {}
