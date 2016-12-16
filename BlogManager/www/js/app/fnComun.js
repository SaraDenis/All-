"use strict";
var fnComun = {};

fnComun.cancelaOrden = function(obj,funct) { 

    if(!obj || obj === ''){
        fn.notificacion({type:'danger',text:'No se puede concretar la cancelación'});
        return false;
    }
    
    if (obj.idproducto === "" || obj.idempresa === "") {
        fn.notificacion({type:'danger',text:'No se puede concretar la cancelación'});
        return false;
    }

    var link = config.api.cancelaOrden;
    var parametros = '&params='+fn.jsonEncode(obj);

    var procesaCancelacion = function(err,Op){
        if (err) {
            fn.notificacion({type:'danger',text:'No se puede concretar la cancelación'});
            return;
        }else{
            fn.notificacion({type:'success',text:'Se ha realizado la cancelación'});
            if(funct && typeof funct === 'function'){
                funct();
            }
        }
    }

    restIO.cargaDatosRemoto({
        link: link,
        parametros: parametros,
        callback: procesaCancelacion
    });
}/*fnComun.cancelaOrden*/

fnComun.infoEmpresa = function(obj){
    if(!obj){ return; }

    var link = config.api.infoEmpresa,
        parametros = '&params='+fn.jsonEncode(obj);
    
    var cargaInfoEmpresa = function(){
        var procesaInfoEmpresa = function(err, obj){
            if(err){ 
                fn.notificacionPopUp({
                    type:'danger', 
                    text:'No se cargo correctamente la información de la empresa, intentar nuevamente.',
                    destino:'#modalInfoEmpresa .modal-header'
                });
                return; 
            }

            obj = obj[0];
            var $modal = $('#modalInfoEmpresa');
            $modal.find('.modal-title').html('Detalle de licencia de '+obj.compania);
             
            $modal.find('#tipoProducto').val(obj.tipoProducto);
            $modal.find('#token, #tke').val(obj.tke);
            $modal.find('#TipoLicencia').val(obj.tipoLicencia);
            $modal.find('#Frecuencia').val('cada '+obj.frecuencia+' mes(es)');
            $modal.find('#usuario').val(obj.maxUsuarios);
            $modal.find('#xALTA').val(obj.alta);
            $modal.find('#Expiracion').val(obj.expiracion);
            $modal.find('#ADMINNOMBRE').val(obj.nombreAdmin);
            $modal.find('#ADMINCORREO').val(obj.correoAdmin);
            $modal.find('#TEL_CONTACTO').val(obj.telContacto);
            
            $modal.find('#UBICACION').val(obj.ubicacion);
            $modal.find('#NOMBRECONTACTO').val(obj.nombreContacto);
            $modal.find('#NOMBRE, #NombreRazonSocial').val(obj.nombre);
            $modal.find('#TELEFONO').val(obj.telefono);
            
            $modal.find('#CORREO').val(obj.correo);
            $modal.find('#DIRECCION, #direccionFiscal').val(obj.direccion);
            $modal.find('#CIUDAD, #ciudadFactura').val(obj.ciudad);
            $modal.find('#CodigoPostal').val(obj.cp);
            $modal.find('#rfc').val(obj.rfc);
            
            
            $modal.find('#forma_pago').val(obj.formaPago);
            
            if(obj.factura){
                $modal.find('#facturaSi').prop('checked',true);
                $modal.find('#facturaNo').removeAttr('checked');
                fnComun.necesitaFactura(1);
            }
            var paisEmpresa = (obj.paisSeleccionado) ? obj.paisSeleccionado : 'MX';
            var edoEmpresa = (obj.estadoSeleccionado) ? obj.estadoSeleccionado : 'QROO';
            
            console.log(paisEmpresa, edoEmpresa);

            fnComun.paises({destino:$modal.find('#idpais'), valor:paisEmpresa});
            fnComun.estados({destino:$modal.find('#estado'), valor:edoEmpresa, pais:paisEmpresa});
        }/*procesaInfoEmpresa*/
        
        restIO.cargaDatosRemoto({
            link: link,
            parametros: parametros,
            callback: procesaInfoEmpresa
        });
    }/*cargaInfoEmpresa*/

    popUp.modal({
        id:'modalInfoEmpresa',
        link:'/templates/infoEmpresa.html',
        titulo:'Información de la empresa',
        callback:cargaInfoEmpresa,
        onClick:'fnComun.actualizaInfoEmpresa(this);'
    });
}/*infoEmpresa*/

fn.templateOption = '{{#each opciones}}<option value="{{idOpcion}}">{{opcion}}</option>{{/each}}';

fnComun.paises = function(obj){
    var $destino = $(obj.destino), valor = (obj.valor) ? obj.valor : null;
    var linkJsonPaisEstados = config.api.jsonPaisEstados;

    var procesaPaises = function(err,obj){
        obj = fn.quitaVaciosArr(obj);
        var objOpciones = {};
        objOpciones.opciones = (_.size(obj)) ? obj : [{idOpcion:'', opcion:'(... No disponible ...)'}];
        var opciones = constructorUI.reemplazaDatos({template:fn.templateOption,datos:objOpciones});
        if ($destino){ 
            $destino.html(opciones);
            if (valor){
                $destino.val(valor);
            }
        }
    }

    restIO.cargaDatosRemoto({
        link: linkJsonPaisEstados,
        parametros: '',
        callback: procesaPaises
    });
}

fnComun.estados = function(obj){
    var $destino = $(obj.destino), valor = (obj.valor) ? obj.valor : null, pais = (obj.pais) ? obj.pais : null;
    var linkJsonPaisEstados = config.api.jsonPaisEstados;
    $destino.html('<option value="">Cargando estados...</option>');
    var procesaPaises = function(err,obj){
        obj = fn.quitaVaciosArr(obj);
        var objOpciones = {};
        objOpciones.opciones = (_.size(obj)) ? obj : [{idOpcion:'', opcion:'(... No disponible ...)'}];
        var opciones = constructorUI.reemplazaDatos({template:fn.templateOption,datos:objOpciones});
        if ($destino){ 
            $destino.html(opciones);
            if (valor){
                $destino.val(valor);
            }
        }
    }

    if(!pais){console.warn('Se necesita seleccionar un país');}
    var parametros = '&params='+fn.jsonEncode({pais:pais});
    restIO.cargaDatosRemoto({
        link: linkJsonPaisEstados,
        parametros: parametros,
        callback: procesaPaises
    });
}

fnComun.necesitaFactura = function(ban){
    var $modal = $('#modalInfoEmpresa'), $infoFacturacion = $modal.find('#infoFacturacion');
    if (ban){
        $infoFacturacion.collapse('show');
    }else{
        $infoFacturacion.collapse('hide');
    }
}/*necesitaFactura*/

fnComun.actualizaInfoEmpresa = function(t){
    var parametros = '&params='+fn.jsonEncode($('#frmInfoEmpresa').serializeObject());
    var link = config.api.actualizaInfoEmpresa;

    var procesaGuardaInfoEmpresa = function(err, obj){
        popUp.cerrarModal();
        if(err){ fn.notificacion({type:'danger', text:'La información no se actualizó correctamente' }); return;}
        
        fn.notificacion({type:'success', text:'Información actualizada.' });
    }

    restIO.cargaDatosRemoto({
        link: link,
        parametros: parametros,
        callback: procesaGuardaInfoEmpresa
    });
}/*actualizaInfoEmpresa*/

fnComun.asignarLicenciaPopUp = function(obj){
	if(!obj){ return; }
    var parametros = '&params='+fn.jsonEncode(obj);
    var compania = obj.compania;
    var tke = obj.tke;
    var tipoProducto = obj.tipoProducto;
    var tipoLicencia = obj.tipoLicencia;
    var opcionesOperacion = '<option value="1" selected>Renovación</option><option value="2">Usuarios adicionales</option>';
    if (tipoLicencia==1){opcionesOperacion = '<option value="0" selected>Suscripción</option>';}

    var datosAsignarLicencia = function(){
        var link = config.api.datosAsignarLicencia;
        var parametros = '&params='+fn.jsonEncode(obj);
        var procesaAsignarLicencia = function(err, obj){
            var creditoDisponible = obj.creditoDisponible[0].SALDO;
            var datosLicencia = obj.datosLicencia[0];
            var $modal = $('#modalAsignarLicencia');
            $modal.find('#creditoDisponible').html(fn.formatMoney(creditoDisponible, 1));
            $modal.find('#operacion').html(opcionesOperacion)

            $modal.find('#tke').val(tke);
            $modal.find('#tipoProducto').val(tipoProducto);
            $modal.find('#nombreCompania').val(compania);
            $modal .find('.modal-header').find('.modal-title').html('Asignar licencia a '+compania);
            var templateProductos = '{{#each productosDisponibles}}<option value="{{idVersion}}"> {{producto}} {{version}} ({{descuento}}% descuento)</option>{{/each}}';
            var opcionesProductos = constructorUI.reemplazaDatos({datos:obj, template:templateProductos});
            $modal.find('#producto').html(opcionesProductos);
            var idVersion = datosLicencia.idVersion;
            $modal.find('#producto').val(idVersion);
            $modal.find('#usuarios').val(datosLicencia.nUsuarios);
            var frecuencia = datosLicencia.frecuencia;
            frecuencia = (frecuencia==1) ? 3 : frecuencia;
            $modal.find('#frecuencia').val(frecuencia);
            if (idVersion==6){
                fnComun.retriccionProductoLicencia(idVersion);    
            }else{
                fnComun.calcularCostoLicencia();    
            }
        }/*procesaAsignarLicencia*/
 
        restIO.cargaDatosRemoto({ link: link, parametros:parametros, callback: procesaAsignarLicencia });
    }/*datosAsignarLicencia*/

	popUp.modal({id:'modalAsignarLicencia', link:'/templates/asignarLicencia.html', titulo:'Asignar licencia', callback:datosAsignarLicencia, onClick:'fnComun.aplicaAsignarLicencia(this);' });
}/*popUpAsignarLicencia*/

fnComun.calcularCostoLicencia = function(){
    var procesaCostos = function(err, obj){
        var calculos = obj[0];
        $('#precioSinIvan').html(fn.formatMoney(calculos.precioSinIva,1));
        $('#ajuste').html(fn.formatMoney(calculos.ajuste,1));
        $('#descuento').html(fn.formatMoney(calculos.descuento,1));
        $('#totalCargar').html(fn.formatMoney(calculos.totalPagar,1));
        $('#nuevoCreditoDisponible').html(fn.formatMoney(calculos.nuevoCreditoDisponible,1));

        if (calculos.nuevoCreditoDisponible < 0 || calculos.aprobado != 1) {
            $('#modalAsignarLicencia .modal-footer .btn[onclick="fnComun.aplicaAsignarLicencia(this);"]').prop( "disabled", true );
            $('#errCreditoDisponible').remove();
            $('#nuevoCreditoDisponible').closest('.input-group').addClass('has-error')
            $('#modalAsignarLicencia .modal-footer').prepend('<span id="errCreditoDisponible" class="btn btn-danger pull-left"><i class="fa fa-lg fa-frown-o"></i> Crédito insuficiente</span>');
        }else{
            $('#modalAsignarLicencia .modal-footer .btn[onclick="fnComun.aplicaAsignarLicencia(this);"]').prop( "disabled", false );
            $('#errCreditoDisponible').remove();
            $('#nuevoCreditoDisponible').closest('.input-group').removeClass('has-error');
        }
    }

    var params = $('#frmCalcularCostos').serializeObject();
    params.calculo = 1;
    var parametros = '&params='+fn.jsonEncode(params);
    var apiAsignarLicencia = config.api.asignarLicencia;
    restIO.cargaDatosRemoto({link:apiAsignarLicencia, parametros:parametros, callback:procesaCostos});
}

fnComun.licenciaRestriccionOperacion = function(v){
    $('#boxFrecuencia, #boxProducto').show();
    if (v==2){
        $('#boxFrecuencia, #boxProducto').hide();
    }
}

fnComun.retriccionProductoLicencia = function(v){
    var $frecuencia = $('#frecuencia');
    $frecuencia.find('option[value="3"]').show();
    $frecuencia.find('option[value="6"]').show();
    if (v==6){
        $('#frecuencia').val(12);
        $frecuencia.find('option[value="3"]').hide();
        $frecuencia.find('option[value="6"]').hide();
    }

    fnComun.calcularCostoLicencia();
}

fnComun.aplicaAsignarLicencia = function(){
    var $producto = $('#producto'), $usuarios = $('#usuarios');
    var nUsuarios = $usuarios.val();
    var producto = $producto.val();
    if (isNaN(nUsuarios) || nUsuarios < 1 || nUsuarios === "") {
        $usuarios.focus();
        fn.notificacionPopUp({type:'warning',text:'Introduzca el número de usuarios',destino:'#modalAsignarLicencia .modal-body'});
        return;
    }

    if (!producto) {
        $producto.focus();
        fn.notificacionPopUp({type:'warning',text:'Seleccione un producto',destino:'#modalAsignarLicencia .modal-body'});
        return;
    }
    


    var nombreCompania = $('#nombreCompania').val();
    var totalCargar = $('#totalCargar').text();
    var nuevoCreditoDisponible = $('#nuevoCreditoDisponible').text();
    var procesaAsignacionLicencia = function(respuesta){
        if (respuesta) {
            var params = $('#frmCalcularCostos').serializeObject();
            params.calculo = 0;
            var successLicencia = function(err,Op){
                if (err) {
                    popUp.cerrarModal();
                    fn.notificacion({type:'danger',text:'No se ha podido asignar la licencia a '+nombreCompania+', intente más tarde'});
                    return;
                }
                var resultado  = Op[0];
                if(resultado.Resultado == 'Ok'){
                    popUp.cerrarModal();
                    fn.notificacion({type:'success',text:'La licencia ha sido asignada a '+nombreCompania+' '});
                    var pagActual = fn.almacen({almacen:'paginaActual'});
                    switch(pagActual) {
                        case 'cartera':
                            carteras.obtieneCartera('');
                            break;
                        case 'demos':
                            demo.obtieneDemos();
                            break;
                        case 'inicio':
                            inicio.obtieneClientesporExpirar();
                            inicio.obtieneOrdenesPendientes();
                            break;
                    }
                }else{
                    popUp.cerrarModal();
                    fn.notificacion({type:'danger',text:'No se ha podido asignadar la licencia a '+nombreCompania+', intente más tarde'});
                }
                
            }
            var apiAsignarLicencia = config.api.asignarLicencia;
            var losParametros = '&params='+fn.jsonEncode(params);
            restIO.cargaDatosRemoto({link:apiAsignarLicencia, parametros:losParametros, callback:successLicencia});
        }
    }/*procesaAsignarLicencia*/
    
    fn.alerta({title:"¿Esta Seguro que desea asignar una licenia a "+nombreCompania+"?",
       text:"\nTotal a cargar: "+totalCargar+" \nNuevo saldo: "+nuevoCreditoDisponible+"",
       type:"warning",
       btnCancelar: true,
       onClose:procesaAsignacionLicencia
    });
}/*aplicaAsignarLicencia*/

fnComun.muestraCambiaPass = function(){
    popUp.modal({id:'modalCambiarPass', link:'/templates/cambiaPassword.html', titulo:'Cambiar contraseña', onClick:'fnComun.cambiaPassword();' });
     setTimeout(function(){
        $('#Contrasena_SingUp').focus();
    },800);
}//muestraCambiaPass

fnComun.cambiarPass = function(){
    if (!window.validaPsw){
        restIO.getScript({script:'/js/app/validaPass.js', callback:fnComun.muestraCambiaPass}); 
    }else{
        fnComun.muestraCambiaPass();
    }
 }/*cambiarPass*/

fnComun.resultadoDeCambiaPass = function(err,obj){
    if(obj[0].resultado == 1){
        $('#Contrasena_SingUp, #RepContrasena_SingUp').val('');
        popUp.cerrarModal();
        fn.notificacion({text:'Se realizo el cambio existosamente.',type:'success'});
    }else{
       console.log(err); 
       fn.notificacionPopUp({text:'Surgió un problema al cambiar la contraseña, intentar más tarde',type:'danger',destino:'.modal-header'}); 
    }
}

fnComun.cambiaPassword = function(){
    var pass             = $('#Contrasena_SingUp').val();
    var fuerzaContrasena = validaPsw.ValidaFuerzaContrasena(pass).puntos;
    var arrContrasenas   = jQuery('#Contrasena_SingUp, #RepContrasena_SingUp');

    if(!validaPsw.ValidaObligatorios()){return;}
    if(!validaPsw.ValidaContrasenas({contrasenas:arrContrasenas})){return;}
    if(fuerzaContrasena < 3){
      fn.notificacionPopUp({text:'La contraseña es muy débil',type:'danger',destino:'.modal-header'}); 
      return;
    }else{
        var pasaPAss = config.api.cambioContrasena;
        var parametros = 'params='+fn.jsonEncode($('#forContra').serializeObject());
        restIO.cargaDatosRemoto({link:pasaPAss, parametros:parametros, callback:fnComun.resultadoDeCambiaPass});    
    }
 }/*cambiarPass*/
