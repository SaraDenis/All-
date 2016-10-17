$(document).ready(function()
{
    $("#form_call").submit(validaSendContacto);
});

function validaSendContacto(e)
{
    
    var $form = $('#form_call');
    var nombre = $form.find('#nombre').val();
    var telefono = $form.find('#telefono').val(); 
    var tipo = $form.find('#tipo').val(); 
    e.preventDefault();
    console.log(nombre,telefono,tipo);

    if (nombre===""|| telefono==="") {
        console.log("Todos los campos son obligatorios");
        validarLlamadaC();
    }
    else {
        var form={
            NOMBRE:nombre,
            TELEFONO:telefono,
            COMENTARIO:tipo
        }
        sendContacto(form);
    }
}

function validarLlamadaC()
{
    error_nombre_llamada.style.display = "none";
    nombre.style.backgroundColor="#ffffff";
    nombre.style.color="#000000";

    error_telefono_llamada.style.display = "none";
    telefono.style.backgroundColor="#ffffff";
    telefono.style.color="#000000";

    if (nombre.value.length == 0||/^\s+$/.test(nombre.value))
    {
        error_nombre_llamada.style.display="block";
        nombre.style.borderColor="#a94442";
        nombre.style.backgroundColor="#eadcdc";
        if(telefono.value.length == 0||/^\s+$/.test(telefono.value)||!(/^\d{10}$/.test(telefono.value)))
        {
            error_telefono_llamada.style.display="block";
            telefono.style.borderColor="#a94442";
            telefono.style.backgroundColor="#eadcdc";
        }
        return false;
    }
    if(telefono.value.length == 0||/^\s+$/.test(telefono.value)||!(/^\d{10}$/.test(telefono.value)))
    {
        error_telefono_llamada.style.display="block";
        telefono.style.borderColor="#a94442";
        telefono.style.backgroundColor="#eadcdc";
        if (nombre.length == 0||/^\s+$/.test(nombre))
        {
            error_telefono_llamada.style.display="block";
            telefono.style.borderColor="#a94442";
            telefono.style.backgroundColor="#eadcdc";
        }
        return false;
    }
    return true;
}

function sendContacto(form)
{
    var form=
    {
        IDEMPRESA:config.id_empresa_cumbre,
        NOMBRE:form.NOMBRE,
        TELEFONO:form.TELEFONO,
        IDORIGEN:config.id_origen_home_cumbre,
        IDETIQUETA:config.id_etiqueta_llama_inmediato,
        IDUSUARIO:config.id_usuario_cumbre,
        COMENTARIOS:"Solicitud llama de inmediato. TELEFONO #tipo: "+ form.COMENTARIO,
        SP_VERSION:2
    };
    console.log(form);
    var request= $.ajax(
    {
      method: "POST",
      url: config.ingresa_registro,
      data: form,
    })
    request.done(function(res)
    {
        console.log("correo enviado");
        window.location.href = 'contacto-done.shtml';
        //alert( "success-" + res);
    })
    request.fail(function(jqXHR, textStatus)
    {
        console.log(jqXHR);
        console.log(textStatus);
        alert("Error de envio!");
        //alert( "error -" + jqXHR +"-" + textStatus);
    })
}