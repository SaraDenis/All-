"use strict";
var config =  { } ;

config.esLocal = false;

if (config.esLocal){
   config.URL        = 'http://localhost:3000';
   config.baseURL    = '/';
}else{
  config.URL         = 'https://distapi.salesup.com.mx';
  config.baseURL     = '/api/';
}

config.baseRemoto  = '/privado/';
config.lsRepositorio = 'perfil';

config.api = {
	login                : config.baseRemoto + '?INFO=135F27C157FB5088A883C7AC251EC87EC42F3AD8F5C21A6915FA16124094BDDF149C58DAF73BEB8802EFAD27A5',
	salir                : config.baseRemoto + 'salir.dbsp',
	cartera              : config.baseURL    + 'cartera.dbsp',
	demos                : config.baseURL    + 'demos.dbsp',
	ordenesPendientes    : config.baseURL + 'ordenes_pendientes.dbsp',
	demosPorExpirar      : config.baseURL + 'demos_por_expirar.dbsp',
	EstadoDeCuenta       : config.baseURL + 'EstadoDeCuenta.dbsp',
	infoEmpresa          : config.baseURL + 'infoEmpresa.dbsp',
	productosDistribuidor: config.baseURL +'productosDistribuidor.dbsp',
	reclamaCliente       : config.baseURL +'reclamaCliente.dbsp',
	actualizaInfoEmpresa : config.baseURL +'actualizaInfoEmpresa.dbsp',
	creditoDisponible    : config.baseURL +'creditoDisponible.dbsp',
	cancelaOrden         : config.baseURL +'cancelaOrden.dbsp',
	datosAsignarLicencia : config.baseURL +'datosAsignarLicencia.dbsp',
	distribuidor         : config.baseURL + 'distribuidor.dbsp',
	asignarLicencia      : config.baseURL + 'asignarLicencia.dbsp',
	cambioContrasena     : config.baseURL + 'cambioContrasena.dbsp',
	jsonPaisEstados      : config.baseURL + 'jsonPaisEstados.dbsp'
};