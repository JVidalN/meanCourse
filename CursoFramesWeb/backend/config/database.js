const mongoose = require('mongoose');
module.exports = mongoose.connect('mongodb://localhost/db_finance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório.";
mongoose.Error.messages.Number.min =
  "O atributo '{VALUE}' informado é menor que o limite mínimo de 'MIN'.";
mongoose.Error.messages.Number.max =
  "O atributo '{VALUE}' informado é maior que o limite máximo de 'MAX'.";
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo 'PATH'.";
