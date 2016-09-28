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
    console.log(correo);
    if(correo)
    {
        if(nombre)
        {
            if(empresa)
            {
                if(telefono)
                {
                    console.log(correo,nombre,empresa,telefono);
                    suscription(correo,nombre,empresa,telefono);
                }
                else
                {
                    telefono='';
                    suscription(correo,nombre,empresa,telefono);
                }
            }
        }
    }
}
function suscription(correo,nombre,empresa,telefono)
{
    var correo=correo;
    var nombre=nombre;
    var empresa=empresa;
    var telefono=telefono;
    var form=
    {
        IDEMPRESA:config.id_empresa,
        NOMBRE:nombre,
        CORREO:correo,
        EMPRESA:empresa,
        IDORIGEN:config.id_origen_patrocinio,
        IDETIQUETA:config.id_etiqueta_patrocinio,
        IDUSUARIO:config.id_usuario_fernando,
        COMENTARIOS:"Prepatrocinio",
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
        console.log(res);
        alert("Correo Enviado");
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