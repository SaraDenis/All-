$(document).ready(function()
{
    $("#patrocinio_form").submit(validaSend);
});

function validaSend(e)
{
    e.preventDefault();
    var correo =document.getElementById("InputEmail").value;
    var nombre =document.getElementById("InputName").value;
    var empresa =document.getElementById("InputCompany").value;
    var telefono =document.getElementById("InputTelefono").value;
    var comentario =document.getElementById("TextComment").value;
    var expresion = /\w+@\w+\.+[a-z]/;
    console.log(correo,empresa,nombre,telefono,comentario);

    if (nombre===""|| correo===""|| empresa===""|| telefono===""|| comentario==="") {
        console.log("Todos los campos son obligatorios");
        if(correo.length>100 || !expresion.test(correo)){
        console.log("el correo no es válido");
    }
    }
    else {
        var form={
            CORREO:correo,
            NOMBRE:nombre,
            EMPRESA:empresa,
            TELEFONO:telefono,
            COMENTARIO:comentario
        };
        suscription(form);
    }
}
function suscription(datos)
{
    var form=
    {
        IDEMPRESA:config.id_empresa_cumbre,
        NOMBRE:datos.NOMBRE,
        TELEFONO:datos.TELEFONO,
        CORREO:datos.CORREO,
        EMPRESA:datos.EMPRESA,
        IDORIGEN:config.id_origen_Patrocinador_Cumbre,
        IDETIQUETA:config.id_etiqueta_Int_Patrocinio,
        IDUSUARIO:config.id_usuario_Patrocinador,
        COMENTARIOS:"Prepatrocinio: "+ datos.COMENTARIO,
        SP_VERSION:2
    };
    //console.log(form);
    var request= $.ajax(
    {
      method: "POST",
      url: config.ingresa_registro,
      data: form,
    });
    request.done(function(res)
    {
        //console.log("correo enviado");
        window.location.href = 'info-done-patrocinadores.shtml';
        //alert( "success-" + res);
    });
    request.fail(function(jqXHR, textStatus)
    {
        console.log(jqXHR);
        console.log(textStatus);
        alert("Error de envio!");
        //alert( "error -" + jqXHR +"-" + textStatus);
    });
}