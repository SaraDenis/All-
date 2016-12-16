"use strict";

var autores = {};

autores.cargaLtAutores = function() {
	console.log('cargaLtAutores');
};

autores.nuevoAutor = function() {
	popUp.modal({
		id: 'modalNuevoAutor',
		link: '/templates/registrarAutor.html',
		titulo: 'Agrega un nuevo autor.',
		onClick: 'autores.guardaAutor();'
		// callback: cargaInfoEmpresa;
	});

	setTimeout(function(){
		$("#nombreAutor").focus();
	}, 500);
}

autores.guardaAutor = function() {
	var pasa = fn.validaObligatorio();
	
	if(pasa) {
		console.log('guardaAutor');
		popUp.cerrar();
	};
}