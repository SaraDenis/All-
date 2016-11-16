$(function() {
    $(document).on("scroll", function(){
        var desplazamientoActual = $(document).scrollTop();
        var controlArriba = $("#scrollBreakPoint");
        console.log("Estoy en " , desplazamientoActual); 
        if ((screen.width<=425) && (screen.height<=897)) {
          $("#scrollBreakPoint").css("display", "none");
        }
        else if(desplazamientoActual > 400 && controlArriba.css("display") == "none"){
            controlArriba.fadeIn(500);
        }
        if(desplazamientoActual < 400 && controlArriba.css("display") == "block"){
            controlArriba.fadeOut(500);
        }
            
        });
    $('a[href^="#"]').on('click', function(event) {
           var target = $( $(this).attr('href') );
           if( target.length ) {
               event.preventDefault();
               $('html, body').animate({
                   scrollTop: target.offset().top
               }, 800);
           }
         });

    });
    