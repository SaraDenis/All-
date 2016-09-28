$(document).ready(function()
{
    $("#suscribir_form").submit(validaEnvio);
});

function validaEnvio(e)
{
    e.preventDefault();
    var email =document.getElementById("email");
    var nombre =document.getElementById("nombre");
    var telefono =document.getElementById("telefono");
    var origen =document.getElementById("origen");
    var etiqueta =document.getElementById("etiqueta");
    var error_email = document.getElementById("error_email");
    var error_nombre = document.getElementById("error_nombre");

    error_email.style.display = "none";
    email.style.backgroundColor = "#ffffff";
    email.style.color = "#000000";
    error_nombre.style.display = "none";
    nombre.style.backgroundColor = "#ffffff";
    nombre.style.color = "#000000";

    //console.log(email,nombre,telefono,origen,etiqueta);
    if(email.value.length != 0 && /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(email.value) && nombre.value.length!=0 )
    {
        suscribir(email.value,nombre.value,telefono.value,origen.value,etiqueta.value);
        //console.log(email,nombre,telefono,origen,etiqueta);
    }
    else
    {
        if(email.value.length == 0||!(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(email.value)))
        {
            error_email.style.display = "block";
            email.style.backgroundColor="#eadcdc";
            email.style.borderColor="#a94442";
        }
        if (nombre.value.length == 0||/^\s+$/.test(nombre.value))
        {
            nombre.style.borderColor="#a94442";
            nombre.style.backgroundColor="#eadcdc";
            error_nombre.style.display = "block";
        }
    }
}

function decolorar(elemento){elemento.style.backgroundColor = "#ffffff";elemento.style.borderColor="#ccc";elemento.style.backgroundColor="#fff";}

function suscribir(email,nombre,telefono,origen,etiqueta)
{
    var email=email;
    var nombre=nombre;
    var telefono=telefono;
    var origen=origen;
    var etiqueta=etiqueta;
    var form=
    {
        IDEMPRESA:config.id_empresa,
        NOMBRE:nombre,
        TELEFONO:telefono,
        CORREO:email,
        IDORIGEN:origen,
        IDETIQUETA:etiqueta,
        IDUSUARIO:config.id_usuario,
        COMENTARIOS:"Registro Taller Eduardo zavala",
        SP_VERSION:2
    };
    //console.log(form);
    var request= $.ajax(
    {
      method: "POST",
      url: config.ingresa_registro,
      data: form,
    })
    request.done(function(res)
    {
        //console.log(res);
        //alert("Correo Enviado");
        if(origen==3071){window.location.href = 'info-taller.shtml';}
        
    })
    request.fail(function(jqXHR, textStatus)
    {
        console.log("____________");
        console.log(jqXHR);
        console.log("____________");
        console.log(textStatus);
        console.log("____________");
        alert("Error de envio!");
        //alert( "error -" + jqXHR +"-" + textStatus);
    })
}