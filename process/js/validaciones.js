function despintar(elemento){elemento.style.borderColor = "#ccc";elemento.style.color = "#000000";elemento.style.backgroundColor = "#fff";}
function validar() {
	var nombre = $('#nombre').val();
	var correo = $('#correo').val();
	var compania = $('#compania').val();
	var puesto = $('#puesto').val();
	var telefono = $('#telefono').val();
	var industria = $('#industria').val();
    var comentario =$('#comentario').val();

	var emailreg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var telreg=/^\d{10}$/;

	if (nombre!=""&& correo!=""&&emailreg.test(correo)&&compania!=""&&puesto!=""&&telefono!="" && telreg.test(telefono)&&industria!="")
	{
		//alert('hecho');
		var form={
			nombre:nombre,
			correo:correo,
			telefono:telefono,
			compania:compania,
			puesto:puesto,
			industria:industria,
            comentario:comentario
		};
		//console.log(form);
		enviar(form);
		return false;
	}
	else
	{
		if (nombre==""){$('#nombre').css('border-color','red');}
		if (correo==""|| !emailreg.test(correo)){$('#correo').css('border-color','red');}
		if (compania==""){$('#compania').css('border-color','red');}
		if (puesto==""){$('#puesto').css('border-color','red');}
		if (telefono==""|| !telreg.test(telefono)){$('#telefono').css('border-color','red');}
		if (industria==""){$('#industria').css('border-color','red');}
		return false;
	}
	return false;
}

function enviar(datos)
{
	//console.log(datos);
    var form=
    {
        IDEMPRESA:config.id_empresa,
        NOMBRE:datos.nombre, //siempre debe tener nombre correo y origen
        TELEFONO:datos.telefono,
        COMPANIA:datos.compania,
        CORREO:datos.correo,
        PUESTO:datos.puesto,
        INDUSTRIA:datos.industria,
        IDORIGEN:config.id_origen_prospecto,
        IDETIQUETA:config.id_etiqueta_registro,
        IDUSUARIO:config.id_usuario,
        COMENTARIOS:"Descargable: "+ datos.comentario,
        SP_VERSION:2
    };
    //console.log(form);
    var request= $.ajax(
    {
      method: "POST",
      url: config.ingresa_registro,
      data: form
    });

    request.done(function(res)
    {
        alert("Correo Enviado");
        //console.log(res);
        //alert( "success:" + res);
        
    });

    request.fail(function(jqXHR, textStatus)
    {
        console.log("____________");
        console.log(jqXHR);
        console.log("____________");
        console.log(textStatus);
        console.log("____________");
        alert("Error de envio!");
        //alert( "error -" + jqXHR +"-" + textStatus);
    });
}