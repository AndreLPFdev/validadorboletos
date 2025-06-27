const express = require('express');
const router = express.Router();
const Boleto = require('../models/Boleto');

// Rota para validar boleto
router.post('/validar', async (req, res) => {
  const { codigo } = req.body;

  // Validação simples: verifica se o código tem apenas números e 47 ou 48 dígitos
  const ehValido = /^\d{47,48}$/.test(codigo);

  const boleto = new Boleto({ codigo, valido: ehValido });
  await boleto.save();

  res.json({ codigo, valido: ehValido });
});

module.exports = router;