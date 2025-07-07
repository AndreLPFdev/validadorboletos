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
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // POST /documents/upload → recebe arquivos enviados por formulário
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Arquivos serão salvos nessa pasta local
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // .pdf, .jpg, etc.
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      // Não bloqueia nenhum tipo de arquivo
      fileFilter: (req, file, cb) => {
        cb(null, true); // ← aceita todos os tipos de arquivo
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    console.log('Arquivo recebido no backend:', file.originalname, file.mimetype);

    // Simples validação de extensão (pode ajustar depois para conteúdo real)
    const isValid = this.validateBoleto(file.originalname);

    // Cria DTO com os dados
    const document: CreateDocumentDto = {
      name: file.originalname,
      filename: file.filename,
      valid: isValid,
    };

    this.documentsService.create(document);

    return {
      message: 'Arquivo enviado com sucesso',
      valid: isValid,
    };
  }

 
  // Validação fictícia (apenas verifica se o nome termina com .pdf)
  private validateBoleto(filename: string): boolean {
    return filename.endsWith('.pdf'); // ← pode ser expandido depois
  }
}