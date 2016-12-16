"use strict";
var login = {};

login.particulas = function(){
    $('#particles').particleground({
        minSpeedX: 0.1,
        maxSpeedX: 0.7,
        minSpeedY: 0.1,
        maxSpeedY: 0.7,
        directionX: 'left', // 'center', 'left' or 'right'. 'center' = dots bounce off edges
        directionY: 'center', // 'center', 'up' or 'down'. 'center' = dots bounce off edges
        density: 10000, // How many particles will be generated: one particle every n pixels
        dotColor: 'rgba(244,142,33, 0.1)',
        lineColor: 'rgba(124,62,132, 0.1)',
        particleRadius: 10, // Dot size
        lineWidth: 2,
        curvedLines: true,
        proximity: 100, // How close two dots need to be before they join
        parallax: false
    });
}/*login.particulas*/

login.muestraMensaje = function(obj){
    var mensaje = obj.mensaje;
    var $msjError = $('#mensajeLogin');
    $msjError.html(mensaje).removeClass('hide');
    setTimeout(function(){ $msjError.addClass('in'); }, 100);
}

login.ingresarEnter = function(e){
    var Key = (e.keyCode ? e.keyCode : e.which);
    if(Key==13){
        login.ingresar($('#btnIngresar')[0]);        
    }
}

login.ingresar = function(t){
    constructorUI.btnSpin({t:t, mensaje:'Validando...'});
    var $email = $('#email'), $psw = $('#password');
    var usuario = $email.val();
    var clave   = $psw.val();
    if (!usuario){login.muestraMensaje({mensaje:'<i class="fa fa-lg fa-warning"></i> Escriba un nombre de usuario'}); $email.focus(); constructorUI.btnSpin({t:t, reset:true}); return;}
    if (!clave){login.muestraMensaje({mensaje:'<i class="fa fa-lg fa-warning"></i> Escriba una contraseña'}); $psw.focus(); constructorUI.btnSpin({t:t, reset:true}); return;}
    
    var url = config.api.login;

    var method = (config.entorno == config.ENTORNO_DESARROLLO) ? 'get' :'post' ;

    var params = {email:usuario, password:clave};
        params = 'email='+usuario+'&password='+clave;
    var procesaIngresarLogin = function(err, obj){
        var resp = (obj.Resultado!=0);
        if(!resp){
            sys.almacenamiento(config.lsRepositorio, JSON.stringify(obj));
            sys.perfil = obj;
            constructorUI.btnSpin({t:t, reset:true});
            constructorUI.btnSpin({t:t, mensaje:'Ingresando'});
            document.location = '/webapp/inicio.html';
        }else{
            login.muestraMensaje({mensaje:'<i class="fa fa-lg fa-times"></i> Usuario ó contrase&ntilde;a incorrectos'});
            constructorUI.btnSpin({t:t, reset:true});
        }
    }/*procesaIngresarLogin*/
    
    if (config.esLocal){
        document.location  = '/webapp/inicio.html';
    }else{
        restIO.cargaDatosRemoto ({link:url, parametros:params, callback:procesaIngresarLogin });
    }
}/*login.ingresar*/

login.particulas();

