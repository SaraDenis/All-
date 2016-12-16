'use strict';
var rutasUsuarios      = require('./rutasUsuarios');

var routes = function(router, auth){

	rutasUsuarios.rutas(router, auth);

	router.route('*'). get( function(req, res){
		res.status(404).send({error:'¿A dónde ibas?'})
	});

}


exports.routes = routes;