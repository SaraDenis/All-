"use strict";	
var popUp = {};
 
popUp.modal = function(obj){
	obj.id = (obj.id) ? obj.id : constructorUI.idUnico();
	obj.contenido = (obj.contenido) ? obj.contenido : null;
	obj.titulo = (obj.titulo) ? obj.titulo : null;
	obj.link = (obj.link) ? obj.link : null;
	obj.btnCerrar = (obj.btnCerrar) ? obj.btnCerrar : 'Cerrar';
	obj.btnAccion = (obj.btnAccion) ? obj.btnAccion : 'Aceptar';
	obj.iconoAccion = (obj.iconoAccion) ? obj.iconoAccion : '<i class="fa fa-check"></i>';
	obj.tamano = (obj.tamano) ? obj.tamano : '';
	var procesaModal = function(err, html){
		if (err){console.error(err); return;}
		$('.distModal, .modal-backdrop').remove();
		
		var datos = constructorUI.reemplazaDatos({template:html, datos:obj});

		$('body').prepend(datos);
		var $modal = $('#'+obj.id);
		$modal.modal({show:true});
		popUp.modalActual = $modal;
		if (obj.callback){ obj.callback(); }
	}

	var obtenTemplateModal =  function(err, html){
		if(html){ obj.contenido = html; }
		restIO.cargaDatos({link:'/templates/modal.html', dataType:'html', callback:procesaModal});
	}
	
	if(!obj.link){
		obtenTemplateModal();
	}else{
		restIO.cargaDatos({link:obj.link, dataType:'html', callback:obtenTemplateModal});
	}
}/*popUp.modal*/

popUp.cerrar = function(){
	var $modal = popUp.modalActual;
	$modal.modal('hide');
	setTimeout(function(){
	  $modal.remove();
	}, 1500);
}

popUp.demo = function(){
	popUp.modal({
        id:'modalDemo',
        link:'/templates/demo.html',
        titulo:'Título demo'
        
        /*,
        onClick:'plantillas.guardaPlantilla(this);',
        callback:cargaInfoEmpresa,
        */
    });
}