import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './documents/dto/create-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    console.log('Arquivo recebido no backend:', file.originalname); // ← para debug

    const isValid = this.validateBoleto(file.originalname); // Validação fictícia
    const document: CreateDocumentDto = {
      name: file.originalname,
      filename: file.filename,
      valid: isValid,
    };

    this.documentsService.create(document);

    return { message: 'Arquivo enviado com sucesso', valid: isValid }; // ← aqui retornamos a mensagem esperada
  }

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  private validateBoleto(filename: string): boolean {
    // Validação fictícia
    return filename.endsWith('.pdf');
  }
}

export default DocumentsController;