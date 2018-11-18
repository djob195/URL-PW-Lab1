const express = require('express');
const app = express();

app.use(require('./ingrediente'));

module.exports = app;