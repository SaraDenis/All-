
'use strict';
var express         = require('express');
var routesManager   = require('./routes');
var bodyParser      = require('body-parser');
var config          = require("./config");

config = config.config;
var app = express();
var session = require('express-session');

app.use(session(config.sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var auth = function(req, res, next) {
  if (req.session && req.session.datosPublicos)
    return next();
  else{
	  	return res.status(401).send({error:'You shall not pass!'})
    }
};

var router = express.Router(); 
routesManager.routes(router, auth);


app.use(router);
app.listen(config.port, function () {
  console.log('Ejecutando servidor en el puerto ' + config.port);
});
