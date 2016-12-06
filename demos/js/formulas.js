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
 * Función utilizada para Es el costo de realizar una cotización al mes x vendedor
 * @param a recibe el valor de Tiempo promedio que te toma hacer una cotización
 * @param b recibe el valor de cotizaciones mensuales promedio de 1 vendedor.
 * @param c recibe el valor de numero de vendedores en la empresa 
 * @return las horas al mes que son consumidas por los vendedores para realizar una cotización
 */
SU.fn.calculaCosto=function(a,b,c,d){
	return (a/b/c/60)*d
};

SU.fn.calculaCostoMensual=function(a,b,c){
	return Math.round( a*b*c); 
};

SU.fn.calculaDias=function(a,b,c){
	return ((a*b*c)/60)/8; 
}