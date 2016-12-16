"use strict";
var articulos = {};

articulos.cargaLtArticulos = function(){
	console.log('cargando articulos...');
}

articulos.nuevoArticulo = function(){
	popUp.modal({
        id:'modalArticulos',
        link:'/templates/registrarArticulo.html',
        titulo:'Registra un nuevo articulo',
        callback:articulos.iniciaTiny/*
        onClick:'fnComun.actualizaInfoEmpresa(this);'*/
    });
}

articulos.iniciaTiny=function(){
	tinymce.init({
		selector: 'textarea#contenidoArticulo',
		height: 500,
		theme: 'modern',
		plugins: [
		'lists preview',
		'wordcount visualblocks visualchars',
		'insertdatetime  save ',
		'template paste textcolor colorpicker '
		],
		toolbar1: 'undo redo  | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ',
		toolbar2: 'preview | forecolor backcolor  ',
		image_advtab: true,
		templates: [
		{ title: 'Test template 1', content: 'Test 1' },
		{ title: 'Test template 2', content: 'Test 2' }
		],
		content_css: [
		'//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
		'//www.tinymce.com/css/codepen.min.css'
		]
	});
}