<?php
	$destino="cumbreproventas@salesup.com";
	$nombre = $_POST["nombre"];
	$tipo = $_POST["tipo"];
	$telefono = $_POST["telefono"];
	$contenido= "El Contacto Solicitó Información"
				. "\r\n\n" 
				. "Nombre: "
				. $nombre 
				. "\r\n\n" 
				. "Telefono: "
				. $telefono 
				."\r\n\n"
				. "Tipo: "
				. $tipo;

	if (mail($destino, "Llama de inmediato", $contenido, "From: $correo\r\nReply-To: $correo\r\nReturn-Path: $correo\r\n", "-f $destino"))
	{           
    	echo "Teléfono enviado exitosamente, en breve nos comunicaremos contigo";
    }
    else
    {
        echo "Teléfono NO enviado, error.". error_log(message);
    }
?>
