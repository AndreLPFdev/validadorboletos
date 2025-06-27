Descrição
O Validador de Boletos é uma aplicação web que permite o upload e a validação automática de boletos bancários. O sistema analisa os documentos enviados, verifica a validade dos códigos de barras, armazena os arquivos no backend e mantém um histórico dos boletos validados.

Funcionalidades
Upload de arquivos PDF contendo boletos.

Validação automática dos códigos de barras dos boletos.

Armazenamento dos arquivos no servidor.

Histórico com lista dos boletos enviados e seus status de validação.

Backend construído com NestJS e MongoDB para gerenciamento dos dados.

Frontend em React para interface amigável e responsiva.

Como usar
Requisitos
Node.js instalado (versão recomendada 16+)

MongoDB rodando localmente ou remotamente

Passos para rodar localmente
Clone o repositório:

bash
Copy
Edit
git clone https://github.com/AndreLPFdev/validadorboletos.git
cd validadorboletos
Instale as dependências do backend e frontend:

Backend:

bash
Copy
Edit
cd backend
npm install
Frontend:

bash
Copy
Edit
cd ../
npm install
Configure a conexão com o MongoDB no arquivo backend/db.js (ou onde estiver configurado).

Execute o backend:

bash
Copy
Edit
cd backend
npm run start
Execute o frontend:

bash
Copy
Edit
cd ../
npm start
Acesse a aplicação no navegador em: http://localhost:3000

Fluxo do sistema
O usuário acessa a interface web e faz o upload de arquivos PDF.

O backend recebe os arquivos, faz a validação do código do boleto e salva o arquivo e seus dados no banco.

O usuário pode consultar o histórico de boletos enviados e os resultados da validação.

Estrutura do projeto
/backend — código da API NestJS, incluindo modelos, controladores e serviços.

/src — código React do frontend.

/uploads — pasta onde os arquivos PDF enviados são armazenados.

Tecnologias usadas
React (Frontend)

NestJS (Backend)

MongoDB (Banco de dados)

Mongoose (ODM)

Node.js
