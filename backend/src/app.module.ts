import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';

// Importa o módulo do Mongoose
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Inicializa a conexão com o MongoDB usando Mongoose
    MongooseModule.forRoot('mongodb://localhost:27017/validadorboletos'), // ← aqui você conecta ao banco chamado "validadorboletos"

    // Seus módulos da aplicação
    UsersModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
