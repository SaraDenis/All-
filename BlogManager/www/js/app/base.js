"use strict";
var sys = {};
sys.perfil = {};
 
sys.preparaURL = function(url){
	var url;
	if (config.esLocal)
		url = url.replace('.dbsp', '');
	return config.URL + url;
};

sys.nombreUsuario = function () {
	return sys.perfil.Nombre + ' ' + sys.perfil.Apellidos;
};

sys.almacenamiento = function(nombre, valor){
	if (!valor)
		valor = localStorage.getItem(nombre);
	else
		localStorage.setItem(nombre, valor)
	return valor;
}

sys.eliminaSesion = function(){
	localStorage.removeItem(config.lsRepositorio);
}

sys.inicia = function (){

	var perfil = sys.almacenamiento(config.lsRepositorio)	;
	if (!perfil){
		$.ajax({  url:sys.preparaURL(config.baseRemoto) , method: "GET"    })
		.done(function(data) {
			perfil = data;
			sys.almacenamiento(config.lsRepositorio, data);
			sys.perfil = JSON.parse(data);
		}).fail(function(e){
		});
	}	
	else
		sys.perfil = JSON.parse(perfil);

}

sys.inicia();