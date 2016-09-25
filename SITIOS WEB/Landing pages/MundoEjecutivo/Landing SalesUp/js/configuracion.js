$(document).ready(function(){

/*  Colocar el ID del distribuidor */
SalesUp.Sistema.Almacenamiento({a:'Distribuidor', v:'120'});

SalesUp.Variables.deDonde = 'LandingDistribuidor';
SalesUp.Variables.noGracias = true;

SalesUp.Variables.pEmail = '';
SalesUp.Variables.pContrasenia = '';
SalesUp.Variables.pRepContrasenia = '';
SalesUp.Variables.formaSimple = '';

SalesUp.Demo.PruebaloSignUp();

   $('a[href*="pruebalo"], .linkPruebalo').click(function(e){
  e.preventDefault();
  pos = $('#Nombre_SingUp').offset().top-120;
     $("html, body").animate({
scrollTop: pos}, 1000);
 $('#Nombre_SingUp').focus();
 return false;
   });
});