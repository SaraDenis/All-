/* Funciones Handlebars distribudores */
"use strict";
Handlebars.registerHelper("ActivoInactivo", function(num) {
    var result;
    if (num == 1) {
        result = '<em class="text-success">(Activo)</em>';
    } else {
        result = '<strong class="text-danger">(Inactivo)</strong>';
    }
    return new Handlebars.SafeString(result);
});


Handlebars.registerHelper('hlpVerUso',function(options){
    var verUso = sys.perfil.verUso;
    if(verUso=='1'){
        return options.fn(this) ;
    }else{
        return options.inverse(this);
    }
});

Handlebars.registerHelper('hlpUsoOportunidades',function(){
    var t = this, str = '', montoOportunidad = t.montoOportunidad, nOportunidades = t.nOportunidades;
    nOportunidades = (is.null(nOportunidades)) ? 0 : nOportunidades;
    montoOportunidad = (is.null(montoOportunidad)) ? 0 : montoOportunidad;
    if(nOportunidades){
        str += '<strong>'+nOportunidades+'</strong>';
        if(montoOportunidad){str += ' / '+fn.formatMoney(montoOportunidad,true);}
    }

    return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('hlpUsoVentas',function(){/*{{nVentas}} / {{formatMoney montoVenta}}*/
    var t = this, str = '', montoVenta = t.montoVenta, nVentas = t.nVentas;
    nVentas = (is.null(nVentas)) ? 0 : nVentas;
    montoVenta = (is.null(montoVenta)) ? 0 : montoVenta;
    if(nVentas){ 
        str += '<strong>'+nVentas+'</strong>';
        if(montoVenta){str += ' / '+fn.formatMoney(montoVenta,true);}
    }
    
    return new Handlebars.SafeString(str);
});

Handlebars.registerHelper("formatMoney", function(num,allow0) {
    allow0 = (isNaN(allow0)) ? 0: allow0;
    num = (isNaN(num)) ? 0: num;
    var result = fn.formatMoney(num,allow0);
    return new Handlebars.SafeString(result);
});

Handlebars.registerHelper("formatPercent", function(num) {
    num = parseFloat(num*100);
    if (isNaN(num) || num == 0) {
        return new Handlebars.SafeString(" 0.00% ");
    }

    var result = num.toFixed(2)+'%';
    return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});