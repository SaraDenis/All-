// Name space de trabajo para la aplicacion de funciones y variables
var SU=window.SU||{};
// Grupo de funciones en el name space
SU.fn=SU.fn||{};
/**
 * @Metod calculaCotizaciones
 * Función utilizada para el calculo de Cotizaciones realizadas en un día
 * @param a recibe el valor de Días laborales promedio al mes
 * @param b recibe el valor de Cotizaciones mensuales promedio de 1 vendedor
 * @return el total de Cotizaciones realizadas en un día
 */
SU.fn.calculaCotizaciones=function(a,b){
	return (b/a);
};

/**
 * @Metod calculaMinutos
 * Función utilizada para los minutos que se dedican diariamente para hacer cotizaciones
 * @param a recibe el valor de Cotizaciones realizadas en un día
 * @param b recibe el valor de Tiempo promedio que te toma hacer una cotización
 * @return el total de minutos que se dedican diariamente para hacer cotizaciones
 */
SU.fn.calculaMinutos=function(a,b){
	return b*a;
};

/**
 * @Metod calculaTiempo
 * Función utilizada para el porcentaje del tiempo que un vendedor dedica para hacer una cotización
 * @param a recibe el valor de minutos que se dedican diariamente para hacer cotizaciones
 * @param b recibe el valor de la Jornada laboral en hrs
 * @return el porcentaje del tiempo que un vendedor dedica para hacer una cotización
 */
SU.fn.calculaTiempo=function(a,b){
	return (a/(b*60))*100;
};

/**
 * @Metod calculaHoras
 * Función utilizada para las horas al mes que son consumidas por los vendedores para realizar una cotización
 * @param a recibe el valor de Tiempo promedio que te toma hacer una cotización
 * @param b recibe el valor de cotizaciones mensuales promedio de 1 vendedor.
 * @param c recibe el valor de numero de vendedores en la empresa 
 * @return las horas al mes que son consumidas por los vendedores para realizar una cotización
 */
SU.fn.calculaHoras=function(a,b,c){
	return (a*b*c)/60; 
};

/**
 * @Metod calculaCosto
 * Función utilizada para saber el costo de realizar una cotización al mes por vendedor
 * @param a recibe el valor del sueldo promedio de un vendedor
 * @param b recibe el valor de dias laborales promedio al mes
 * @param c recibe el valor de la jornada laboral en hrs
 * @param d recibe el valor del tiempo promedio  que toma hacer una cotización.
 * @return el costo de realizar una cotización al mes por vendedor
 */
SU.fn.calculaCosto=function(a,b,c,d){
	return (a/b/c/60)*d
};

/**
 * @Metod calculaCostoMensual
 * Función utilizada para saber el costo mensual promedio que tiene la empresa para realizar cotizaciones
 * @param a recibe el valor del costo de realizar una cotización al mes por vendedor
 * @param b recibe el valor de las cotizaciones mensuales promedio de 1 vendedor
 * @param c recibe el valor de los numeros de vendedores
 * @return el costo mensual promedio que tiene la empresa para realizar cotizaciones.
 */
SU.fn.calculaCostoMensual=function(a,b,c){
	return Math.round( a*b*c); 
};

/**
 * @Metod calculaDias
 * Función utilizada para saber los días equivalentes que dedican para realizar cotizaciones
 * @param a recibe el valor del tiempo promedio que te toma hacer una cotización
 * @param b recibe el valor de las cotizaciones mensuales promedio de 1 vendedor
 * @param c recibe el valor de numero de vendedores
 * @return los días equivalentes que dedican para realizar cotizaciones.
 */
SU.fn.calculaDias=function(a,b,c){
	return ((a*b*c)/60)/8; 
}