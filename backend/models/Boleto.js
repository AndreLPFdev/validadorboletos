const mongoose = require('mongoose');

const BoletoSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  valido: {
    type: Boolean,
    required: true,
  },
  dataValidacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Boleto', BoletoSchema);
