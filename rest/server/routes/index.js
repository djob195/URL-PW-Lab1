const express = require('express');
const app = express();

app.use(require('./receta/index'));

module.exports = app;