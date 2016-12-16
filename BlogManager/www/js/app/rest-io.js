"use strict";
/**
 * @author Equipo de FrontEnd
 * @description Se encarga de las funciones para cargar información por ajax, scripts y templates, tambien valida la session activa
*/
var restIO= {};

restIO.cargaDatosRemoto = function(obj){
	(obj.link)			? obj.link 	 	 = sys.preparaURL(obj.link) : '';
	restIO.cargaDatos(obj);
}

restIO.validaSession = function(obj){ return true;
	if(!obj){return;}
	obj = (is.not.json(obj)) ? obj[0]: obj;
	
	var resultado = obj.Resultado;
	
	if(!resultado){return;}
	if((resultado)&&(resultado<=4)&&(resultado!='0')){
		console.error('¯\\_(ツ)_/¯\n\r'+obj.Msg);
		var path = document.location.pathname;
		if(path=='/'){
			if (login){
				login.muestraMensaje({mensaje:'<i class="fa fa-lg fa-times"></i> Usuario ó contrase&ntilde;a incorrectos'});	
				$('#email').focus();
			}
			constructorUI.btnSpin({t:$('#btnIngresar')[0], reset:true}); 
			return;
		}else{
			app.salirSistema();	
		}
	}
}/*restIO.validaSession*/

restIO.esError = function(obj, link){
	if(!obj){return;}
	obj = (is.not.json(obj)) ? obj[0]: obj;

	var resultado = obj.Resultado;
	
	if(!resultado){return;}
	if((resultado)&&(resultado==5)){
		console.error(obj.Msg, 'Ooops...!\n\r(╯°□°）╯︵ ┻━┻\n\rOrigen\n\r'+link );
		return obj;
	}
	return null;
}/*restIO.esError*/

restIO.cargaDatos = function(obj){
	$('.tipsy').remove();

	var agregaTiempo = function(datos){
		datos = (datos) ? datos : '';
		var contiempo = 'webapp='+constructorUI.idUnico() + '&' + datos;
		return contiempo;
	}

	var metodo='GET', linkFile, parametros='', destino, callback, objecto, esPagina, dataType='json', 
	almacen, Respuesta='', respuestaAlmacen, error, prmAdicionales, formData = false, cache = true,
	contentType = 'application/x-www-form-urlencoded; charset=UTF-8', processData = true;
	
	(obj.link)			? linkFile 	 	 = obj.link : '';
	(obj.parametros) 	? parametros 	 = obj.parametros : '';
	(obj.prmAdicionales)? prmAdicionales = obj.prmAdicionales : '';
	(obj.callback)		? callback   	 = obj.callback : '';
	(obj.dataType)		? dataType   	 = obj.dataType : '';
	(obj.almacen)		? almacen   	 = obj.almacen:'';
	(obj.metodo)		? metodo   	 	 = obj.metodo:'';
	(obj.formData)		? formData 	 	 = obj.formData:'';
	(obj.cache)			? cache 	 	 = obj.cache:'';

	parametros = agregaTiempo(parametros);

	if(formData){ contentType = false; processData = false;	}

	if ((sys.perfil.Token) &&  (!formData)){
		parametros += '&token=' + sys.perfil.Token;
	}

	if(almacen){
		respuestaAlmacen = fn.almacen({almacen:almacen});
		if((respuestaAlmacen)&&(respuestaAlmacen!=null)&&(respuestaAlmacen!=undefined)){
			if (callback){callback(null, respuestaAlmacen, null, prmAdicionales);}
			return true;
		}
	}

	$.ajax({ 
		type:metodo, async:true, dataType: dataType, cache: cache, 
		contentType: contentType, processData: processData,
		url: linkFile, data: parametros
	}).done(function(datos, status, xhr){
		restIO.validaSession(datos);
		var hayError = restIO.esError(datos, linkFile);

		var registros = parseInt(xhr.getResponseHeader('X-Total-Count'));
		
		(almacen) ? fn.almacen({almacen:almacen, valor:datos}):'';
		
		(callback) ? callback( hayError, datos, registros, prmAdicionales) : '';

	}).fail(function(xhr, textStatus, errorThrown){
		error = { xhr:xhr, textStatus:textStatus, errorThrown:errorThrown };
		(callback) ? callback( error, null, null, prmAdicionales) : '';
	});

	return true;
}/* /cargaDatos */

restIO.noEncontrado = 'noEncontrado.html';
restIO.htmlNoEncontrado = '';

restIO.cargaNoEncontrado = function(){
	restIO.cargaDatos({
	    link:restIO.noEncontrado, dataType:'html',
	    callback:function(err,datos){
	    	if(err){
	    		restIO.htmlNoEncontrado = 'Error';
	    		return true;
	    	}

			restIO.htmlNoEncontrado = datos;
	    }
	});
}/*cargaNoEncontrado*/

restIO.cargaTemplates =  function(obj){
	(!obj) ? obj = {}:'';
	var template = (obj.template) ? obj.template : restIO.noEncontrado;
	var param = (obj.param) ? obj.param : '';
	var callback = (obj.callback) ? obj.callback : null;
	var $destino = (obj.destino) ? $(obj.destino) : $('#datos');

	restIO.cargaDatos({
	    link:template, dataType:'html',
	    callback:function(err,datos){
	    	if(err){ $destino.html(restIO.htmlNoEncontrado); }
	    	
	    	fn.paginaActual();

			$destino.html(datos);
			
			if (callback){ 
				if(_.isFunction(callback)){
					callback(obj);
				}

				if (_.isString(callback)){
					eval(callback);
				}
			}
	    }
	});
}/*cargaTemplates*/

restIO.getScript = function(obj){
	var script = obj.script, callback = obj.callback;
	$.getScript(script, function( data, textStatus, jqxhr ) {
		/*console.info( "getScript... " , script );*/
		if(callback){callback();}
	});
}/*getScript*/

restIO.verUso = function(){
	var verUso = sys.perfil.verUso;
    if(verUso=='1'){
        return true;
    }else{
        return false;
    }
}