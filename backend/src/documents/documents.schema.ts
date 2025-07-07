// Importações essenciais para usar o Mongoose com NestJS
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Aqui estamos criando um *tipo* que combina a interface Document do Mongoose com a nossa classe.
// Isso permite que possamos usar métodos do Mongoose como .save() e .find() no nosso schema.
export type BoletoDocument = Boleto & Document;

// Marcamos a classe como um Schema do Mongoose com o decorator @Schema()
@Schema()
export class Boleto {
  // Nome original do arquivo enviado (ou nome atribuído pelo sistema)
  @Prop()
  name: string;

  // Nome do arquivo salvo na pasta 'uploads'
  @Prop()
  filename: string;

  // Informa se o boleto foi validado como verdadeiro ou não
  @Prop()
  valid: boolean;

  // Data em que o arquivo foi enviado. É criada automaticamente.
  @Prop({ default: Date.now })
  uploadedAt: Date;
}

// Criamos o schema real a partir da classe BoletoDocument.
// Esse schema será registrado no módulo do NestJS para poder salvar no MongoDB.
export const DocumentSchema = SchemaFactory.createForClass(Boleto);

