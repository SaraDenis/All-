var nombre_llamada = document.getElementById("nombre_llamada");
var telefono_llamada = document.getElementById("telefono_llamada");
var error_nombre_llamada = document.getElementById("error_nombre_llamada");
var error_telefono_llamada = document.getElementById("error_telefono_llamada");
var m_nombre = document.getElementById("m_nombre");
var m_email = document.getElementById("m_email");
var m_telefono = document.getElementById("m_telefono");
var m_mensaje = document.getElementById("m_mensaje");
var error_m_nombre = document.getElementById("error_m_nombre");
var error_m_email = document.getElementById("error_m_email");
var error_m_telefono = document.getElementById("error_m_telefono");
var error_m_mensaje = document.getElementById("error_m_mensaje");
var error1 = document.getElementById("error1");
var error2 = document.getElementById("error2");

function validarLlamada()
{
    error_nombre_llamada.style.display = "none";
    nombre_llamada.style.backgroundColor="#ffffff";
    nombre_llamada.style.color="#000000";

    error_telefono_llamada.style.display = "none";
    telefono_llamada.style.backgroundColor="#ffffff";
    telefono_llamada.style.color="#000000";

    if (nombre_llamada.value.length == 0||/^\s+$/.test(nombre_llamada.value))
    {
        error_nombre_llamada.style.display="block";
        nombre_llamada.style.borderColor="#a94442";
        nombre_llamada.style.backgroundColor="#eadcdc";
        if(telefono_llamada.value.length == 0||/^\s+$/.test(telefono_llamada.value)||!(/^\d{10}$/.test(telefono_llamada.value)))
        {
            error_telefono_llamada.style.display="block";
            telefono_llamada.style.borderColor="#a94442";
            telefono_llamada.style.backgroundColor="#eadcdc";
        }
        return false;
    }
    if(telefono_llamada.value.length == 0||/^\s+$/.test(telefono_llamada.value)||!(/^\d{10}$/.test(telefono_llamada.value)))
    {
        error_telefono_llamada.style.display="block";
        telefono_llamada.style.borderColor="#a94442";
        telefono_llamada.style.backgroundColor="#eadcdc";
        if (nombre_llamada.length == 0||/^\s+$/.test(nombre_llamada))
        {
            error_telefono_llamada.style.display="block";
            telefono_llamada.style.borderColor="#a94442";
            telefono_llamada.style.backgroundColor="#eadcdc";
        }
        return false;
    }
    return true;
}

function mostrarLLamada(){error1.style.display = "block";setTimeout(ocultarLlamada, 3000);}

function ocultarLlamada(){error1.style.display = "none";}

function validarMensaje()
{
    error_m_nombre.style.display = "none";
    m_nombre.style.backgroundColor = "#ffffff";
    m_nombre.style.color = "#000000";

    error_m_email.style.display = "none";
    m_email.style.backgroundColor = "#ffffff";
    m_email.style.color = "#000000";

    error_m_telefono.style.display = "none";
    m_telefono.style.backgroundColor = "#ffffff";
    m_telefono.style.color = "#000000";

    error_m_mensaje.style.display = "none";
    m_mensaje.style.backgroundColor = "#ffffff";
    m_mensaje.style.color = "#000000";

    if (m_nombre.value.length == 0||/^\s+$/.test(m_nombre.value))
    {
        m_nombre.style.borderColor="#a94442";
        m_nombre.style.backgroundColor="#eadcdc";
        error_m_nombre.style.display = "block";
        if(m_email.value.length == 0||/^\s+$/.test(m_email.value)||!(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(m_email.value)))
        {
            error_m_email.style.display = "block";
            m_email.style.borderColor="#a94442";
            m_email.style.backgroundColor="#eadcdc";
        }
        if (m_telefono.value.length == 0||/^\s+$/.test(m_telefono.value)||!(/^\d{10}$/.test(m_telefono.value)))
        {
            error_m_telefono.style.display = "block";
            m_telefono.style.borderColor="#a94442";
            m_telefono.style.backgroundColor="#eadcdc";
        }
        if(m_mensaje.value.length == 0||/^\s+$/.test(m_mensaje.value))
        {
            error_m_mensaje.style.display = "block";
            m_mensaje.style.borderColor="#a94442";
            m_mensaje.style.backgroundColor="#eadcdc";
        }
        return false;
    }

    if(m_email.value.length == 0||/^\s+$/.test(m_email.value)||!(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(m_email.value)))
    {
        error_m_email.style.display = "block";
        m_email.style.borderColor="#a94442";
        m_email.style.backgroundColor="#eadcdc";
        if (m_nombre.value.length == 0||/^\s+$/.test(m_nombre.value))
        {
            m_nombre.style.borderColor="#a94442";
            m_nombre.style.backgroundColor="#eadcdc";
            error_m_nombre.style.display = "block";

        }
        if (m_telefono.value.length == 0||/^\s+$/.test(m_telefono.value)||!(/^\d{10}$/.test(m_telefono.value)))
        {
            error_m_telefono.style.display = "block";
            m_telefono.style.borderColor="#a94442";
            m_telefono.style.backgroundColor="#eadcdc";
        }
        if(m_mensaje.value.length == 0||/^\s+$/.test(m_mensaje.value))
        {
            error_m_mensaje.style.display = "block";
            m_mensaje.style.borderColor="#a94442";
            m_mensaje.style.backgroundColor="#eadcdc";
        }
        return false;
    }

    if (m_telefono.value.length == 0||/^\s+$/.test(m_telefono.value)||!(/^\d{10}$/.test(m_telefono.value)))
    {
        error_m_telefono.style.display = "block";
        m_telefono.style.borderColor="#a94442";
        m_telefono.style.backgroundColor="#eadcdc";
        if (m_nombre.value.length == 0||/^\s+$/.test(m_nombre.value))
        {
            m_nombre.style.borderColor="#a94442";
            m_nombre.style.backgroundColor="#eadcdc";
            error_m_nombre.style.display = "block";
        }
        if(m_email.value.length == 0||/^\s+$/.test(m_email.value)||!(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(m_email.value)))
        {
            error_m_email.style.display = "block";
            m_email.style.borderColor="#a94442";
            m_email.style.backgroundColor="#eadcdc";
        }
        if(m_mensaje.value.length == 0||/^\s+$/.test(m_mensaje.value))
        {
            error_m_mensaje.style.display = "block";
            m_mensaje.style.borderColor="#a94442";
            m_mensaje.style.backgroundColor="#eadcdc";
        }
        return false;
    }

    if(m_mensaje.value.length == 0||/^\s+$/.test(m_mensaje.value))
    {
        error_m_mensaje.style.display = "block";
        m_mensaje.style.borderColor="#a94442";
        m_mensaje.style.backgroundColor="#eadcdc";
        if (m_nombre.value.length == 0||/^\s+$/.test(m_nombre.value))
        {
            m_nombre.style.borderColor="#a94442";
            m_nombre.style.backgroundColor="#eadcdc";
            error_m_nombre.style.display = "block";
        }
        if(m_email.value.length == 0||/^\s+$/.test(m_email.value)||!(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(m_email.value)))
        {
            error_m_email.style.display = "block";
            m_email.style.borderColor="#a94442";
            m_email.style.backgroundColor="#eadcdc";
        }
        if (m_telefono.value.length == 0||/^\s+$/.test(m_telefono.value)||!(/^\d{10}$/.test(m_telefono.value)))
        {
            error_m_telefono.style.display = "block";
            m_telefono.style.borderColor="#a94442";
            m_telefono.style.backgroundColor="#eadcdc";
        }
        return false;
    }

    return true;
}

function mostrarMensaje(){error2.style.display = "block";setTimeout(ocultarMensaje, 3000);}

function ocultarMensaje(){error2.style.display = "none";}

function despintar(elemento){elemento.style.borderColor = "#ccc";elemento.style.color = "#000000";;elemento.style.backgroundColor = "#fff";}