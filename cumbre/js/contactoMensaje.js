$(document).ready(function()
{
    $("#form_message").submit(validaSendMensaje);
});

function validaSendMensaje(e)
{
    e.preventDefault();
    var $form = $('#form_message');
    var nombreM = $form.find('#nombreM').val();
    var telefonoM = $form.find('#telefonoM').val(); 
    var correoM = $form.find('#correoM').val(); 
    var mensajeM = $form.find('#mensajeM').val();
    var error_m_nombre =$form.find('#error_m_nombre').val();
    var error_m_email =$form.find('#error_m_email').val();
    var error_m_telefono =$form.find('#error_m_telefono').val();
    var error_m_mensaje =$form.find('#error_m_mensaje').val();
    var expresion = /\w+@\w+\.+[a-z]/; 
    console.log(nombreM,telefonoM,correoM,mensajeM);

    if (nombreM===""|| telefonoM==="" || correoM==="" || mensajeM==="") {
        console.log("Todos los campos son obligatorios");
        validarMensajeC();
    }
    else {
        var form={
            NOMBRE:nombreM,
            TELEFONO:telefonoM,
            CORREO:correoM,
            COMENTARIO:mensajeM
        }
        sendMensaje(form);
    }
}

function validarMensajeC()
{
 error_m_nombre.style.display = "none";
    nombreM.style.backgroundColor = "#ffffff";
    nombreM.style.color = "#000000";

    error_m_email.style.display = "none";
    correoM.style.backgroundColor = "#ffffff";
    correoM.style.color = "#000000";

    error_m_telefono.style.display = "none";
    telefonoM.style.backgroundColor = "#ffffff";
    telefonoM.style.color = "#000000";

    error_m_mensaje.style.display = "none";
    mensajeM.style.backgroundColor = "#ffffff";
    mensajeM.style.color = "#000000";

     if (nombreM.value.length == 0||/^\s+$/.test(nombreM.value))
    {
        nombreM.style.borderColor="#a94442";
        nombreM.style.backgroundColor="#eadcdc";
        error_m_nombre.style.display = "block";
        if(correoM.value.length == 0||/^\s+$/.test(correoM.value)||!(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(correoM.value)))
        {
            error_m_email.style.display = "block";
            correoM.style.borderColor="#a94442";
            correoM.style.backgroundColor="#eadcdc";
        }
        if (telefonoM.value.length == 0||/^\s+$/.test(telefonoM.value)||!(/^\d{10}$/.test(telefonoM.value)))
        {
            error_m_telefono.style.display = "block";
            telefonoM.style.borderColor="#a94442";
            telefonoM.style.backgroundColor="#eadcdc";
        }
        if(mensajeM.value.length == 0||/^\s+$/.test(mensajeM.value))
        {
            error_m_mensaje.style.display = "block";
            mensajeM.style.borderColor="#a94442";
            mensajeM.style.backgroundColor="#eadcdc";
        }
        return false;
    }
}

function sendMensaje(form)
{
    var form=
    {
        IDEMPRESA:config.id_empresa_cumbre,
        NOMBRE:form.NOMBRE,
        TELEFONO:form.TELEFONO,
        CORREO:form.CORREO,
        IDORIGEN:config.id_origen_home_cumbre,
        IDETIQUETA:config.id_etiqueta_envio_mensaje,
        IDUSUARIO:config.id_usuario_cumbre,
        COMENTARIOS:"Escribio un mensaje:  "+form.COMENTARIO,
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
        console.log("correoM enviado");
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