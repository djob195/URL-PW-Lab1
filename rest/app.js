require('./server/config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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

