const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());

consign().include('routes').include('utils').into(app);

app.listen(port, hostname, ()=>{

  console.log('servidor rodando!');

});
