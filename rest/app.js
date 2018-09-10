require('./server/config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// API
app.use(require('./server/routes/index'));

// Use Promises to Mongoose
mongoose.Promise = global.Promise;

mongoose.connect(process.env.URLDB , (err,res) => {
    if (err) throw err;
    console.log("Base de datos online");
});

app.listen(process.env.PORT , () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});

