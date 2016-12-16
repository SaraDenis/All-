"use strict"; 
 var sys = {};
 sys.perfil = { "nombre":"","apellidos":""}; 
 sys.entorno = 'dev';
 sys.api_dev = 'http://localhost:3000/';
 sys.api_pro = 'https://distapi.salesup.com.mx/data/';

 sys.nombreUsuario = function () {
 	return sys.perfil.nombre + ' ' + sys.perfil.apellidos;
 };

 sys.preparaURL = function(url){
	
	return (sys.entorno == 'dev') ? 
			url = sys.api_dev + url.replace('.dbsp', '/') : 
		  	url = sys.api_pro + url;   
 };

 sys.soportaHTML5 = function () {
	return (document.createElement('canvas').getContext !== undefined);
 };

 sys.getMethod = function() {
 	return (sys.entorno == 'dev') ? 'get' : 'post';
 };


sys.almacenamiento = function(nombre, valor) {
	if (!valor)
		valor = localStorage.getItem(nombre);
	else
		localStorage.setItem(nombre, valor);
	return valor;
};

sys.inicia = function (){
	var repositorio = 'perfil';
	var perfil = sys.almacenamiento(repositorio);
	if (!perfil){
		$.ajax({  url:sys.preparaURL('sesion.dbsp'), method:'GET' })
			.done(function(data) {
				perfil = data;
				sys.almacenamiento(repositorio, JSON.stringify(perfil));
				sys.perfil = perfil;
	    	}).fail(function(e){
	    	});
	}	
	else
		sys.perfil = JSON.parse(perfil);

};

sys.inicia();
