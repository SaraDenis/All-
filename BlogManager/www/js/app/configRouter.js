"use strict";

Router.config({ mode: 'hash',root:'/webapp'});
Router.navigate();
 
 
Router
.add(/fn\/(.*)/, function() {
  return true;
})
.add(/inicio/, function() {
  app.inicio();
})
.add(/salir/, function() {
  app.salirSistema();
})
.add(/articulos/, function() {
  app.articulos();
})
.add(/plantillas/, function() {
  app.plantillas();
})
.add(/autores/, function() {
	app.autores();
})
.add(function(){
	restIO.cargaTemplates();
})
.listen();

Router.pagina = 'inicio';
Router.hashGuardado = fn.paginaActual({get:true});

(Router.hashGuardado) ? Router.pagina = Router.hashGuardado : '';

Router.navigate(Router.pagina);