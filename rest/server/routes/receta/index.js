const express = require('express');
const app = express();

app.use(require('./receta'));

module.exports = app;