$( document ).on( "mouseleave", function() {
	if (localStorage.getItem("tiempo")===null) { 
		if (event.pageY<=1) {
		$(".modalP").fadeIn();
		}
		$(".cerrarP").click(function(){
		localStorage.setItem('tiempo', 1); 
		$(".modalP").fadeOut(300);
		});
	}
});


var frmPopUp = {};
        frmPopUp.validaEnvio = function(e){
            e.preventDefault();
            var email =document.getElementById("email");
            var origen =document.getElementById("idorigen");
            var error_email = document.getElementById("error_email");

            //error_email.style.display = "none";
            email.style.backgroundColor = "#ffffff";
            email.style.color = "#000000";

            if (frmPopUp.validaObligatorio()) {
                var form={
                    email:email.value,
                    origen:origen.value
                };
                frmPopUp.suscribir(form);
            }


            if(email.value.length != 0 && /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(email.value))
            {
                var form={
                    email:email.value,
                    origen:origen.value
                };
                frmPopUp.validaObligatorio();
            }
            else
            {
                var removeClass = function(){removeClass("in");}
                if(email.value.length == 0||!(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(email.value)))
                {
                    email.style.backgroundColor="#eadcdc";
                    email.style.borderColor="#a94442";
                    email.removeClass("in");
                }
            }
        }

        frmPopUp.validaObligatorio = function(){
            var arrObligatorio=$(".obligatorio");
            var arrCampos=[];
            for(var a=0;a<arrObligatorio.length;a++){
            var $opc=$(arrObligatorio[a]);
            //console.log($opc);

            var placeholder;
            var valor = $opc.val();
            if(valor==""){
            arrCampos.push(1);
            $opc.addClass("campoVacio"); 
            }
            }

            if(arrCampos.length>0){
            var $alert = $("#alertForm")
            $alert.html('Por favor complete los campos obligatorios').addClass("in");
            $(".campoVacio").first().focus();
            setTimeout(function(){
            $alert.removeClass("in");
            arrObligatorio.removeClass("campoVacio");
            },3000);    
            return false;
            }
            return true;
        }


        frmPopUp.decolorar = function(elemento){elemento.style.backgroundColor = "#ffffff";elemento.style.borderColor="#ccc";elemento.style.backgroundColor="#fff";}

        frmPopUp.suscribir = function(form)
        {
            var email=form.email;
            var nombre=frmPopUp.nombre;
            var origen=form.origen;
            var etiqueta = frmPopUp.etiqueta;
            var usuario = config.id_usuario;
            var form=
            {
                IDEMPRESA:config.id_empresa,
                CORREO:email,
                NOMBRE:nombre,
                IDORIGEN:origen,
                IDETIQUETA:etiqueta,
                IDUSUARIO:usuario,
                SP_VERSION:2
            };
            console.log(form);
            var request= $.ajax(
            {
            method: "POST",
            url: config.ingresa_registro,
            data: form,
            
            });

            request.done(function(res)//funcion en caso de exito
            {
                alert("Envio de información correcto");
                localStorage.setItem('tiempo', 1); 
				$(".modalP").fadeOut(300);
            });

            request.fail(function(valor, textStatus)//funcion en caso de fallo
            {
                alert("Error de envio!");
            });
        }
