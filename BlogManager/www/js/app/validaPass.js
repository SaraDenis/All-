"use strict";
var validaPsw = {};
/***/
validaPsw.ValidaFuerzaContrasena = function(psw) {
    if (psw === '') {
        return {
            puntos: 0,
            test: new Array(4)
        };
    }
    var array = [],
        sum = 0,
        sumV = 0;
    array[0] = /[A-Z]/.test(psw);
    array[1] = /[a-z]/.test(psw);
    array[2] = /\d/.test(psw);
    array[3] = /[@!_.-]/.test(psw);
    var i;
    for (i = 0; i <= array.length - 1; i++) {
        sum += (array[i] ? 1 : 0);
    }
    for (i = 0; i <= array.length - 2; i++) {
        sumV += (array[i] ? 1 : 0);
    }
    sum = (psw.length >= 8 && sumV == 3) ? sum : (sum > 2) ? 2 : sum;
    return {
        puntos: sum,
        test: array,
        tamano: psw.length
    };
};


validaPsw.CompareInputs = function(inputs1, inputs2) {
    var val1, val2;
    val1 = $('#' + inputs1).val();
    val2 = $('#' + inputs2).val();
    var compara = validaPsw.ComparePassWords(val1, val2);
    if (compara.iguales) {
        return true;
    } else {
        var $DentroDe = $('#' + inputs2).closest('form');
        if (val2.length > 0) {
            setTimeout(function() {
                $('#' + inputs2).focus();
            }, 0);

            fn.notificacionPopUp({text:'Las contraseñas no coinciden',type:'danger',destino:'.modal-header'});
        }
    }
    // if()
};

validaPsw.ComparePassWords = function(pass1, pass2) {
    var iguales = false,
        validez = 0;
    if (pass1 === pass2) {
        iguales = true;
    }
    var valida = validaPsw.ValidaFuerzaContrasena(pass1);
    validez = valida.puntos;

    return {
        validez: validez,
        iguales: iguales
    };
};

 
validaPsw.muestraSugerenciaPsw = function(t){
	var $t = $(t);
	var contenido = $t.attr('data-sugerencias');
 	constructorUI.popOver({t:t, placement:'left',container:contenido, title:'Le sugerimos usar'});
}/*muestraSugerenciaPsw*/

validaPsw.DetallePsw = function(e, Op) {
        var Tipsy = '<div>';
        if (Op.tamano < 8 || Op.tamano === undefined) {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Mínimo 8 carácteres</span><br>';
        } else {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Mínimo 8 carácteres</span><br>';
        }
        if (Op.test[0]) {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Al menos una mayúscula</span><br>';
        } else {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Al menos una mayúscula</span><br>';
        }
        if (Op.test[1]) {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Al menos una minúscula</span><br>';
        } else {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Al menos una minúscula</span><br>';
        }
        if (Op.test[2]) {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Al menos un número</span><br>';
        } else {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Al menos un número</span><br>';
        }
        if (Op.test[3]) {
            Tipsy += '<span><i class=\'fa fa-check Verde\'></i> Deseable un signo @ ! . _ - </span>';
        } else {
            Tipsy += '<span><i class=\'fa fa-times fa-lg Rojo\'></i> Deseable un signo @ ! . _ - ';
        }
        Tipsy += '</div>';

        var tip = '<span class="infoPsw" data-sugerencias="'+Tipsy+'" onmouseenter="validaPsw.muestraSugerenciaPsw(this)"><i class="fa fa-lg fa-info-circle  Azul"></i></span>';
        
        var $Elemento = $(e.t);
        var $padre = $Elemento.closest('div');
        $padre.children('.infoPsw').remove();
        $padre.children('.passwordBar').remove();
        $padre.append(tip);
        var $ProgresoContrasena = $("#ProgresoContrasena");
        if($ProgresoContrasena.length){
            $ProgresoContrasena.show();
            var $passProgress = $("#passProgress");
            var $NivelPassword = $("#NivelPassword");
            $passProgress.removeClass('BgRojo BgAmarillo BgAzul BgVerde w100 w25 w50 w75');
            $NivelPassword.removeClass('Rojo Amarillo Azul Verde');
            
            switch (Op.puntos) {
                case 0:
                    $passProgress.removeClass('BgRojo BgAmarillo BgAzul BgVerde w100 w25 w50 w75').addClass('BgRojo');;
                    $NivelPassword.addClass('Rojo').html("Baja");
                    break;
                case 1:
                    $passProgress.addClass('BgRojo w25');
                    $NivelPassword.addClass('Rojo').html("Baja");
                    break;
                case 2:
                    $passProgress.addClass('BgAmarillo w50');
                    $NivelPassword.addClass('Amarillo').html("Regular");
                    break;
                case 3:
                    $passProgress.addClass('BgAzul w75');
                    $NivelPassword.addClass('Azul').html("Buena");
                    break;
                case 4:
                    $passProgress.addClass('BgVerde w100');
                    $NivelPassword.addClass('Verde').html("Excelente");
                    break;
                default:
                    $passProgress.removeClass('BgRojo BgAmarillo BgAzul BgVerde w100');
                    $NivelPassword.addClass('Rojo').html("Baja");
                    $passProgress.addClass('w100');
                    break;
            }
        }
 };

validaPsw.htmlProgresoContrasena = function(t){
	var html  = '';
		html += '<div class="w100 Transition" id="ProgresoContrasena" style="display: none">';
		html += '	<div class="w100 Italic"><p>Seguridad de la contraseña: <span id="NivelPassword" class="Rojo">Baja</span></div>';
		html += '	<div class="w1 Transition" id="passProgress"></div>';
		html += '</div>';
	var $t = $(t), $padre = $t.closest('.field');
	var $ProgresoContrasena = $('#ProgresoContrasena');
	
	if (!$ProgresoContrasena.length){
		console.log('htmlProgresoContrasena');
		$padre.addClass('boxPsw').append(html);
	}

	$('#Contrasena_SingUp').attr('onblur','validaPsw.reValidarContrasena({t:this})').attr('onkeyup','validaPsw.evalPassword({t:this});');
	$('#RepContrasena_SingUp').attr('onblur','validaPsw.CompareInputs(\'Contrasena_SingUp\',\'RepContrasena_SingUp\')').attr('onkeyup','validaPsw.evalPassword({t:this});');
	
}/*htmlProgresoContrasena*/


validaPsw.evalPassword = function(e){
	$('.popover').hide();
	var $Elemento = $(e.t);
    var psw = $Elemento.val();
    var Op = validaPsw.ValidaFuerzaContrasena(psw);
    validaPsw.DetallePsw(e, Op);
    if (e.callback) e.callback(e, Op);
};

validaPsw.ValidarTamanioContasenia = function(e) {
    var tamanio = ''
    var $DentroDe = e.closest('form');
    var tamaniopasswd = e.val();

    if (tamaniopasswd == '') {
        return;
    }
    if (tamaniopasswd.length >= 8) {
        tamanio = true;
    } else {
        tamanio = false;
        fn.notificacionPopUp({text:'La contraseña debe ser al menos <b>8 de carácteres',type:'danger',destino:'.modal-header'});
        setTimeout(function() {
            e.focus();
        }, 0);
    }
    return tamanio;
};

validaPsw.ContieneMayusculas = function(e) {
    var $DentroDe = e.closest('form');
    var psw = e.val();
    var valida = /[A-Z]/.test(psw);
    var tam = e.val();
    tam = tam.length;
    if (tam == 0) {
        return true;
    } else if (!valida) {
        fn.notificacionPopUp({text:'La contraseña debe tener al menos <b>una mayúscula</b>',type:'danger',destino:'.modal-header'});
        setTimeout(function() {
            e.focus();
        }, 0);
        return false;
    }
    return true;
};

validaPsw.ContieneMinusculas = function(e) {
    var $DentroDe = e.closest('form');
    var psw = e.val();
    var valida = /[a-z]/.test(psw);
    var tam = e.val();
    tam = tam.length;
    if (tam == 0) {
        return true;
    } else if (!valida) {
        fn.notificacionPopUp({text:'La contraseña debe tener al menos <b>una minúscula</b>',type:'danger',destino:'.modal-header'});
        
        setTimeout(function() {
            e.focus();
        }, 0);
        return false;
    }
    return true;
};

validaPsw.ContieneNumeros = function(e) {
    var $DentroDe = e.closest('form');
    var psw = e.val();
    var valida = /\d/.test(psw);
    var tam = e.val();
    tam = tam.length;
    if (tam == 0) {
        return true;
    } else if (!valida) {
        fn.notificacionPopUp({text:'La contraseña debe tener al menos <b>un número</b>',type:'danger',destino:'.modal-header'});
        
        setTimeout(function() {
            e.focus();
        }, 0);
        return false;
    }
    return true;
};

validaPsw.reValidarContrasena = function(e) {
    var $Elemento = $(e.t);
    $Elemento.closest('form').find('input[type="password"]:eq(1)').val("");
    if (validaPsw.ValidarTamanioContasenia($Elemento)) {
        if (validaPsw.ContieneMayusculas($Elemento)) {
            if (validaPsw.ContieneMinusculas($Elemento)) {
                validaPsw.ContieneNumeros($Elemento);
            }
        }
    }
};

validaPsw.ValidaObligatorios = function(Op){
    var Pasa = true, $DentroDe, DestinoMsj='body', arrObligatorios;
    (_.isUndefined(Op)) ? Op = {} : '';
    (Op.DentroDe) ? $DentroDe = Op.DentroDe : '';
    (Op.DestinoMsj) ? DestinoMsj = Op.DestinoMsj : '';
    
    var noCuenta;
    if($DentroDe){
        arrObligatorios = $DentroDe.find('.esObligatorio');
    }else{
        arrObligatorios = $('.esObligatorio');
    }
    
    for (var i = 0; i <= arrObligatorios.length - 1; i++){
        var $Elemento = $(arrObligatorios[i]);
        
        noCuenta = ( ($Elemento.hasClass('selectize-control') ) || ( $Elemento.hasClass('selectize-dropdown') ) );
        if(!noCuenta){
            if( _.isEmpty($Elemento.val()) ){
                Pasa = false;
                fn.notificacionPopUp({text:'Los campos marcados son <strong>Obligatorios</strong>',type:'danger',destino:'.modal-header'});
                validaPsw.MarcarObligatorio($Elemento);
                validaPsw.FocusMal();
            }
        }

    
    };
    return Pasa;
    
}/* /ValidaObligatorios */

validaPsw.FocusMal = function(){
    var $t = $('.DatoMal:first');
    
    $('#Tabs .ui-tabs-panel').each(function(){
        var Hay = $(this).find('.DatoMal').length;
        if(Hay>0){
            var IdTab = $(this).attr('id');
            $('a[href="#'+IdTab+'"]').click();
            return false;
        }
    });
    setTimeout(function() { $t.focus(); }, 100);
}

validaPsw.QuitarMarcadorObligatorio = function($t){
    $t.removeClass('DatoMal'); 
    $t.prev().removeClass('InfoDatoMal');
}

validaPsw.MarcarObligatorio = function($t){
    $t.addClass('DatoMal');
    $t.prev().addClass('InfoDatoMal');
    $t.change(function(){ validaPsw.QuitarMarcadorObligatorio($t); }).keyup(function(){ validaPsw.QuitarMarcadorObligatorio($t); });
}

validaPsw.ValidaEsCorreo = function(Op){
    var v = $.trim(Op.v);
    var $Elemento = $(Op.t);
    var $DentroDe = $Elemento.closest('form');
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var Pasa = re.test(v);
    if(!Pasa){
        fn.notificacionPopUp({text:'El correo <b>['+v+']</b> es inválido, por favor verifique de nuevo.',type:'danger',destino:'.modal-header'});
        validaPsw.MarcarObligatorio($Elemento);
        validaPsw.FocusMal();
    }
    
    return Pasa;
}

validaPsw.ValidaContrasenas = function(Op){
    var arrContrasenas = Op.contrasenas;
    var $p1 = $(arrContrasenas[0]);
    var $p2 = $(arrContrasenas[1]);
    var $DentroDe = $p1.closest('form');
    var Pasa;
    var v1 = $p1.val();
    var v2 = $p2.val();

    if(v1===v2){
        Pasa = true;
    }else{
        fn.notificacionPopUp({text:'Las contraseñas deben de ser iguales.',type:'danger',destino:'.modal-header'});
        validaPsw.MarcarObligatorio($p1);
        validaPsw.MarcarObligatorio($p1);
        validaPsw.FocusMal();
        Pasa = false;
    }

    return Pasa;
}
