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
    console.log(correo);

    
    if(correo)
    {
        if(nombre)
        {
            if(empresa)
            {
                if(telefono)
                {
                    console.log(correo,nombre,empresa,telefono,comentario);
                    suscription(correo,nombre,empresa,telefono,comentario);
                }
                else
                {
                    telefono='';
                    suscription(correo,nombre,empresa,telefono,comentario);
                }
            }
        }
    }
}
function suscription(correo,nombre,empresa,telefono,comentario)
{
    var correo=correo;
    var nombre=nombre;
    var empresa=empresa;
    var telefono=telefono;
    var comentario=comentario;
    var form=
    {
        IDEMPRESA:config.id_empresa_cumbre,
        NOMBRE:nombre,
        CORREO:correo,
        EMPRESA:empresa,
        IDORIGEN:config.id_origen_home_cumbre,
        IDETIQUETA:config.id_etiqueta_Int_Patrocinio,
        IDUSUARIO:config.id_usuario_cumbre,
        COMENTARIOS:"Prepatrocinio: "+ comentario,
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
        if(origen==5387){window.location.href = 'http://cumbreproventas.com/info-done.shtml';}
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