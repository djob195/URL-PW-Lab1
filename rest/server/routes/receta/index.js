const express = require('express');
const app = express();

app.use(require('./paso'));
app.use(require('./receta'));
app.use(require('./recetaIngrediente'));

module.exports = app;