'use strict';
var mdl = require('./modelo');
var modelo = mdl.modelo;

var usuarios = new function(){
	return {
		obtieneUsuarios : function(res){
			usuarios = modelo.obtieneUsuarios(res);
			console.log(usuarios);
		}
	}

};

module.exports = usuarios;

