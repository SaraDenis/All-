"use strict";
var constructorUI = {}; 
constructorUI.porPagina = 10;
constructorUI.idUnico = function(){
	return '_'+Math.random().toString(36).substr(2, 9)+''+(new Date()).getTime();
}

constructorUI.reemplazaDatos = function(obj){
	var HtmlTemplate = Handlebars.compile(obj.template);
	return HtmlTemplate(obj.datos);
}

constructorUI.sinResultados = function($idTabla){
	var arrTh = $idTabla.find('thead').find('th'), colspan = _.size(arrTh);
	var tr = '<tr><td colspan="'+colspan+'"><p class="p15 bg-info text-info"><strong><i class="fa fa-lg fa-info-circle"></i> No se encontraron registros</strong></p></td></tr>';
	var $tbody = $idTabla.find('tbody');
	$tbody.html(tr);
}

constructorUI.dataTable = function($table){
    $table.DataTable({
      lengthChange:false,
      ordering:false,
      searching:false,
      pageLength:25,
      pagingType:"full_numbers",
      language:{
          decimal:        "",
          emptyTable:     "No se encontraron registros.",
          info:           "_START_ - _END_ de _TOTAL_ resultados",
          infoEmpty:      "Mostrar 0 - 0 de 0 registros",
          infoFiltered:   "(filtrado de _MAX_ registros)",
          infoPostFix:    "",
          thousands:      ",",
          lengthMenu:     "Mostrar _MENU_ registros",
          loadingRecords: "Cargando...",
          processing:     "Procesando...",
          search:         "Buscar:",
          zeroRecords:    "No se encontraron regitros con este criterio",
          paginate: {
              first:      "<i class=\"fa fa-lg fa-angle-double-left\" aria-hidden=\"true\"></i>",
              last:       "<i class=\"fa fa-lg fa-angle-double-right\" aria-hidden=\"true\"></i>",
              next:       "<i class=\"fa fa-lg fa-angle-right\" aria-hidden=\"true\"></i>",
              previous:   "<i class=\"fa fa-lg fa-angle-left\" aria-hidden=\"true\"></i>"
          },
          aria: {
              "sortAscending":  ": ver ascendente",
              "sortDescending": ": ver descendente"
          }
      }
    });
}/*constructorUI.dataTable*/

constructorUI.construyeTabla = function(obj){
	var datos = fn.quitaVaciosArr(obj.datos), nFilas = _.size(datos);
    var $destino = $(obj.destino), callback = obj.callback;
    var tHead = obj.tHead, tBody = obj.tBody;
    var idTabla = (obj.id) ? obj.id : constructorUI.idUnico();
    var inicio = (obj.inicio) ? obj.inicio : 1;
	var htmlBody;

    $destino.html('<table class="table table-striped table-hover" id="'+idTabla+'"><thead></thead><tbody></tbody><tfoot></tfoot></table>');
    
    var $idTabla = $('#'+idTabla);
    
    $idTabla.find('thead').html(tHead);
    
    if(!nFilas){ constructorUI.sinResultados($idTabla); return; }
    
    datos = datos.map(function(v){ v.nFila = inicio; inicio ++; return v; });
    tBody = '{{#each jsonData}}' +tBody+ '{{/each}}';
    htmlBody = constructorUI.reemplazaDatos({template:tBody, datos:{jsonData:datos} });
    $idTabla.find('tbody').html(htmlBody);

	if(callback){ callback(); }

	/* constructorUI.laPaginacion */
    constructorUI.dataTable($idTabla);
	fn.iniciaPlugins();
}/*constructorUI.construyeTabla*/

constructorUI.popOver = function(Op){
    var container = '', title = '';
    var $t = jQuery(Op.t);
    
    jQuery('.tipsy').remove();
    jQuery('.popover').hide();
    $t.popover('destroy');

    var placement = 'top', clases='';
    (Op.placement) ? placement = Op.placement : '';
    (Op.title) ? title = Op.title:'';
    (Op.container) ? container = Op.container:'';
    (Op.clases) ? clases = Op.clases:'';

    var popOverId = 'PopOver'+(new Date()).getTime();
    var TemplatePopover = '<div class="popover '+clases+'" id="'+popOverId+'" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';

    var $d = $t.popover({
        html:true, container:'body',
        placement:placement,
        title:title, content:container
    });

    $t.popover('show');

    var $popOverId = jQuery('#'+popOverId);
    if(_.size($popOverId)){$popOverId = jQuery('#'+jQuery('.popover').attr('id'));}
    
    var Cerrar = true;
    $popOverId.mouseleave(function(){
        Cerrar = true;
        setTimeout(function(){(Cerrar) ? $popOverId.hide():'';}, 1000);
    }).mouseenter(function(){
        Cerrar = false;
    }).click(function(){
        $popOverId.hide();
    });

    setTimeout(function(){(Cerrar) ? $popOverId.hide():'';}, 4000);

    $t.mouseleave(function(){
        Cerrar = true;
        setTimeout(function(){(Cerrar) ? $popOverId.hide():'';}, 3000);
    }).mouseenter(function(){
        Cerrar = false;
    });
}/*popOver*/

constructorUI.btnSpin = function(obj){
    var reset = obj.reset, cargando = obj.cargando, mensaje = obj.mensaje,
    $t = $(obj.t), $fa = $t.find('.fa'), icono, cargando,
    spinner = ' <i class="fa fa-lg fa-spin fa-spinner"></i> ', str = $.trim($t.text()), 
    txtBtn = $t.html();

    if(reset){
      $t.html($t.attr('data-btnOriginal'));
      $t.removeAttr('data-btnOriginal');
    }else{
      $t.attr('data-btnOriginal', txtBtn);
      cargando = (cargando) ? 'Cargando ' + spinner : spinner+str ;
      cargando = (mensaje) ? mensaje + spinner : cargando ;
      $t.html(cargando);
    }
}/*constructorUI.spin*/

constructorUI.laPaginacion = function(obj){
    var registros = obj.registros, start = obj.start, callback = obj.callback, $tabla = obj.tabla; 
    var total = registros, porPagina=constructorUI.porPagina, Actual = Math.ceil(start/porPagina);
    var DivPaginacion = '<div id="Paginacion" class="BoxPaginacion paginacion"></div><div class="clear"></div>';
    var divPaginacion = '<div id="Paginacion"></div>';
    var styleTop ='';
    var r_totales = porPagina*Actual;
    if (total > porPagina) {
        var pagtotal = total/porPagina;
            pagtotal = Math.ceil(pagtotal);

        var ultimaPag = 'last', strNext = 'Siguiente <i class="fa fa-chevron-right"></i>';
        console.log('Actual',Actual,'start',start);
        $('#Paginacion').remove();
        $tabla.after(divPaginacion);
        $('#Paginacion').bootpag({
            total:pagtotal, page: Actual, maxVisible: 7, leaps: false, next: strNext,
            firstLastUse: true, prev: '<i class="fa fa-chevron-left"></i> Atras',
            last: 'Fin', first: 'Inicio', lastClass: ultimaPag
        }).on("page",function(event,num){
            var nuevoStart = ((num-1) * porPagina) + 1;
            callback({start:nuevoStart});
        });
    }
};
