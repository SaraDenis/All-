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
        IDEMPRESA:config.id_empresa_cumbre,
        NOMBRE:nombre,
        TELEFONO:telefono,
        CORREO:email,
        IDORIGEN:origen,
        IDETIQUETA:etiqueta,
        IDUSUARIO:config.id_usuario_cumbre,
        COMENTARIOS:"suscripcion",
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
        //alert( "success-" + res);
        if(origen==5387){window.location.href = 'http://cumbreproventas.com/info-done.shtml';}
        else if(origen==5259){window.location.href = 'http://cumbreproventas.com/info-done-GDL.shtml';}
        else if(origen==5257){window.location.href = 'http://cumbreproventas.com/info-done-MTY.shtml';}
        else if(origen==5258){window.location.href = 'http://cumbreproventas.com/info-done-QRO.shtml';}
        else if (origen==6140){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6141){window.location.href = 'http://cumbreproventas.com/info-done-PV.shtml';}//para AB Pepe Villacis
        else if (origen==6142){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}//para AB Eduardo Zavala
        else if (origen==6143){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6144){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6145){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6146){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6147){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6148){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6149){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6150){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6151){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6152){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6427){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6428){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6429){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6430){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6431){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6432){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6433){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6434){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6435){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6436){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6437){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6426){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==6857){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==7231){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==7232){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==7233){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==7234){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
        else if (origen==7238){window.location.href = 'http://cumbreproventas.com/info-done-REF.shtml';}
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