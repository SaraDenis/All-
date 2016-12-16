'use strict';
var FileStreamRotator = require('file-stream-rotator');
var express           = require ('express');
var fs                = require ('fs');
var morgan            = require ('morgan');
var path              = require('path');
var bodyParser        = require('body-parser');
var cookieParser      = require('cookie-parser');
var appConfig         = require('./config/config').config;
var fileManager       = require('./js/fileManager');
var rutas             = require('./js/rutasAdicionales');




//var app = express();
var app = express();

var sqlManager = require ('./js/sqlManager');

var configStr = fs.readFileSync ('./config/routes.json');
var config = JSON.parse (configStr);


/************ LOGGING ***********/

var logDirectory = path.join(__dirname, 'logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/************ LOGGING ***********/

console.log ('********* Running RestOnSQL  ;) ************* ')

if (config.routes) {
	var routeNum = 0;
	config.routes.forEach(function (route) {

		if (route.verb == 'get') {

			app.get (route.path, function (req,res) {
				console.log ('get: ',route.path);
				sqlManager.execSQL (route.query, req, res);
					
			});
			routeNum++;
		} 

		else 

		if (route.verb == 'post') {			

			app.post (route.path, function (req,res) {
				console.log ('post: ',route.path);
				sqlManager.execSQL (route.query, req, res);
			});
			routeNum++;
		}

		else

		if (route.verb == 'put') {			
			
			app.put (route.path, function (req,res) {
				console.log ('put: ',route.path);

				res.send ('put: ' + route.query + 'params: ' + req.params.id );
			});
			routeNum++;
		}

		else

		if (route.verb == 'delete') {			
			
			app.delete (route.path, function (req,res) {
				console.log ('delete: ',route.path);
				res.send ('delete: '+ route.query);
			});
			routeNum++;
		}

	});	

	console.log ('Configured routes: ', routeNum);
	var rutasAdicionales = new rutas.rutasAdicionales()
	rutasAdicionales.cargaAdicionales(app);













}


app.listen (config.port, function () {
  
  console.log ('Escuchando en el puerto ', config.port);
});