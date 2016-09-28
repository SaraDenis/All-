<?php
	$destino="cumbreproventas@salesup.com";
	$nombre = $_POST["nombre"];
	$correo = $_POST["correo"];
	$telefono = $_POST["telefono"];
	$mensaje = $_POST["mensaje"];
	$contenido= "El Contacto Solicitó Información"
				. "\r\n\n" 
				. "Nombre: "
				. $nombre 
				. "\r\n\n" 
				. "Correo: "
				. $correo 
				. "\r\n\n" 
				. "Telefono: "
				. $telefono 
				."\r\n\n"
				. "Mensaje: "
				. $mensaje;

	if (mail($destino, "Envió mensaje, ponte en contacto", $contenido, "From: $nombre\r\nReply-To: $nombre\r\nReturn-Path: $nombre\r\n", "-f $destino"))
	{           
    	echo "Mensaje enviado exitosamente, gracias por contactarnos, en breve nos comunicaremos contigo";
    }
    else
    {
        echo "Mensaje NO enviado, error.". error_log(message);
    }
?>
