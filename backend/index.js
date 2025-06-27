const express = require('express');
const connectDB = require('./db');
const app = express();
const cors = require('cors');

// Conectar ao MongoDB
connectDB();

app.use(cors()); // permitir chamadas do frontend
app.use(express.json()); // ler JSON

// Usar rotas
const boletosRoute = require('./routes/boletos');
app.use('/api/boletos', boletosRoute);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});