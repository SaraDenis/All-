"use strict";
var plantillas = {};

plantillas.cargaLtPlantillas = function(){
	console.log('cargaLtPlantillas');
}

plantillas.nuevaPlantilla = function(){
	popUp.modal({
        id:'modalNuevaPlantilla',
        link:'/templates/nuevaPlantilla.html',
        titulo:'Agrega una nueva plantilla',
        onClick:'plantillas.guardaPlantilla(this);'
        /*,
        callback:cargaInfoEmpresa,
        */
    });
}

plantillas.guardaPlantilla =  function(){
	console.log('guardaPlantilla');

	popUp.cerrar();
}