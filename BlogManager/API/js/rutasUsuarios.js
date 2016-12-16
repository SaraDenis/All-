'use strict';
var usuarios        = require('./usuarios');

var rutasUsuarios = function(router, auth){

	router.route('/login')
		.get(function(req, res) {
			var datos  = {};
			datos.nombre = "Ivan";
			datos.admin  = true;
			req.session.datosPublicos = datos;
			res.json({res: "Bienvenido " + req.session.datosPublicos.nombre});
	});

	router.route('/yo')
		.get(auth,function(req, res) {			
			res.json(req.session.datosPublicos);
	});

	router.route('/logout')
	  .get(auth,function (req, res) {
	  	req.session.destroy();
	  	res.send({ msg: "Adios amigo!"});
	  });	

	router.route('/usuarios')
	.get(auth,function(req,  res) {
		usuarios.obtieneUsuarios(res);
	});
}


exports.rutas = rutasUsuarios;