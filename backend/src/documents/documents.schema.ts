import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocumentDocument = BoletoDocument & Document;

@Schema()
export class BoletoDocument {
  @Prop()
  name: string;

  @Prop()
  filename: string;

  @Prop()
  valid: boolean;

  @Prop({ default: Date.now })
  uploadedAt: Date;
}

export const DocumentSchema = SchemaFactory.createForClass(BoletoDocument);
