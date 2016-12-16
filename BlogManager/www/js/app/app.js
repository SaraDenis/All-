"use strict";
/** @module app */
/**
 * @author FrontEnd
 * @description Carga los modulos principales del sistema.
*/



var app = {};
/**
 * @function bienvenido
 * @description Carga la pantalla principal del sistema inicio, utiliza 
 * la función "getScript" para obtener la libreria "/js/app/inicio.js" que es la que controla este modulo
*/
app.inicio = function(){
	fn.navBarActivo('#inicio');
	/**
	 * @function cargaBienvenida
	 * @description Se encarga de obtener el template de la pantalla principal, por medio de un async
	 * el callback ejecuta la función "inicio.inicializar"
	 * Hace un callback async
	*/ 
	var cargaBienvenida = function(){
		restIO.cargaTemplates({template:'bienvenida.html',callback:inicio.inicializar});
	}

	if (!window.inicio){
		restIO.getScript({script:'/js/app/inicio.js', callback:cargaBienvenida});	
	}else{
		cargaBienvenida();	
	}
	
}/* /cartera */

app.salirSistema = function(){
	localStorage.clear();
	document.location.href = '/';
}

app.articulos = function(){
	fn.navBarActivo('#articulos');
	
	var cargaArticulos = function(){
		restIO.cargaTemplates({template:'articulos.html', callback:articulos.cargaLtArticulos});
	}

	if (!window.articulos){
		restIO.getScript({script:'/js/app/articulos.js', callback:cargaArticulos});	
	}else{
		cargaArticulos();
	}
}/* /articulos */

app.plantillas = function(){
	var cargaPlantillas = function(){
		restIO.cargaTemplates({template:'plantillas.html', callback:plantillas.cargaLtPlantillas});	
	}

	if(!window.plantillas){
		restIO.getScript({script:'/js/app/plantillas.js', callback:cargaPlantillas});
	}else{
		cargaPlantillas();
	}
}

app.autores = function() {
	var cargaAutores = function() {
		restIO.cargaTemplates({template: 'autores.html', callback: autores.cargaLtAutores});
	};

	if(!window.autores) {
		restIO.getScript({script: '/js/app/autores.js', callback: cargaAutores});
	} else {
		cargaAutores();
	};
}
