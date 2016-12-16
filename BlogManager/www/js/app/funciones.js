"use strict";
var fn = {};

fn.strReplace = function(search, replace, subject, count) {
    /* From: http://phpjs.org/functions */
    var i = 0, j = 0, temp = "", repl = "", sl = 0, fl = 0, f = [].concat(search), r = [].concat(replace), s = subject, ra = Object.prototype.toString.call(r) === "[object Array]", sa = Object.prototype.toString.call(s) === "[object Array]";
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }
    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === "") {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + "";
            repl = ra ? r[j] !== undefined ? r[j] : "" : r[0];
            s[i] = temp.split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
};

/* /strReplace */
fn.borraAlmacen = function() {
    for (x = localStorage.length - 1; x >= 0; x--) {
        var Item = localStorage.key(x);
        var Sys = Item.substring(0, 3);
        if (Sys != "_") {
            localStorage.removeItem(Item);
        }
    }
};

/*borraAlmacen*/
fn.almacen = function(obj) {
    if (!obj){return;}
    var almacen = obj.almacen, valor = obj.valor, clave;
    if (!almacen) {return '';}

    for (var x = 0; x <= localStorage.length - 1; x++) {
        clave = localStorage.key(x);
        if (localStorage.getItem(clave) == "[object Object]") {
            localStorage.removeItem(clave);
        }
    }
    var str = '', Contenido = '';
    str = almacen.substring(0, 4);
    var esJson = (str === 'json') ? true : false;
    
    if(!valor){
        var datoGuardado = localStorage[almacen];
        if(datoGuardado) {
            esJson ? datoGuardado = JSON.parse(datoGuardado) : "";
        }
        return datoGuardado;
    }else{
        esJson ? Contenido = JSON.stringify(valor) : Contenido = valor;
        if (Contenido == "[object Object]") {
            return false;
        }

        try{
            localStorage[almacen] = Contenido;
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                fn.borraAlmacen();
                localStorage[almacen] = Contenido;
            }
        }
    }
};
/*almacen*/

fn.tooltip = function() {
    $('[data-toggle="tooltip"]').tooltip();
};

fn.iniciaPlugins = function() {
    fn.tooltip();
};

fn.paginaActual = function(obj) {
    !obj ? obj = {} : "";
    if (obj.get) {
        return fn.almacen({
            almacen: "paginaActual"
        });
    }
    var pagina = "bienvenido";
    var hashActual = document.location.hash;
    hashActual = fn.strReplace("#", "", hashActual);
    hashActual != "" ? pagina = hashActual : "";
    fn.almacen({
        almacen: "paginaActual",
        valor: pagina
    });
};

fn.$navbarCollapse = $('#navbarCollapse');
fn.cierraMenuGral = function(){ fn.$navbarCollapse.collapse('hide'); }

fn.navBarActivo = function(href){
    var $a = $('[href="' + href + '"]');
    var $p = $a.closest("li");
    $(".nav.navbar-nav .active").removeClass("active");
    $p.addClass("active");
    fn.cierraMenuGral();
};

fn.base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = fn.base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64;
            } else if (isNaN(i)) {
                a = 64;
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }
        return t;
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+\/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r);
            }
            if (a != 64) {
                t = t + String.fromCharCode(i);
            }
        }
        t = fn.base64._utf8_decode(t);
        return t;
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128);
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128);
            }
        }
        return t;
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++;
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2;
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3;
            }
        }
        return t;
    }
};

fn.sumaColumna = function(datos, params) {
    var resultados = {}, objColumnas = {};
    for (var x = 0; x < params.length; x++) {
        var columna = params[x].columna, operacion = params[x].operacion, tCambio = params[x].tCambio;
        var respuesta = 0;
        datos.map(function(v) {
            var valor = parseFloat(v[columna]);
            isNaN(valor) ? valor = 0 : "";
            if (tCambio) {
                var cambio = parseFloat(v[tCambio]);
                isNaN(cambio) ? cambio = 1 : "";
                cambio == 0 ? cambio = 1 : "";
                respuesta += valor * cambio;
            } else {
                respuesta += valor;
            }
        });
        objColumnas[columna] = respuesta;
    }
    return objColumnas;
};

/*sumaColumna*/
fn.jsonEncode = function(obj) {
    return fn.base64.encode(JSON.stringify(obj));
};

fn.allow0 = function(allow) {
    accounting.settings.currency.format = {
        pos: "%s%v",
        neg: "<strong class='rojo'>%s(%v)</strong>",
        zero: "-"
    };
    if (allow) {
        accounting.settings.currency.format.zero = "%s%v";
    }
};

fn.formatMoney = function(num, allow0){
    num = parseFloat(num);
    if (isNaN(num) || num == 0) {
        num = 0;
    }
    fn.allow0(allow0);
    return accounting.formatMoney(num);
};

fn.notificacion = function(obj) {

    var text = (obj.text) ? obj.text : '';
    var type = (obj.type) ? obj.type : '';
    var icon = (obj.icon) ? obj.icon : '';
    var alertaPopUp = (obj.popUp) ? 'sysAlertaPopUp' : '';
    var destino = (obj.destino) ? obj.destino : "body";

    if (text == '') { return false;}
    var existe = _.indexOf([ "success", "info", "warning", "danger" ], type);
    
    if (_.indexOf([ "success", "info", "warning", "danger" ], type) < 0) { type = "info"; }

    var iconos = [ "fa-check ", "fa-info-circle ", "fa-exclamation-triangle", "fa-times" ];
    iconos[-1] = "fa-info-circle ";

    
    icon = (icon) ? icon : iconos[existe];
    
    var id = 'alerta'+constructorUI.idUnico();
    var alerta = '<div id="' + id + '" class="SysAlerta '+alertaPopUp+' alert alert-' + type + '" role="alert"> ' + '<i class="fa ' + icon + '"></i>&nbsp;&nbsp;&nbsp;' + text + "</div>";
    $(destino).prepend(alerta);
    
    setTimeout(function(){$("#" + id + "").remove(); }, 6000);
};

fn.notificacionPopUp = function(obj){
    obj.popUp = true;
    fn.notificacion(obj);
}

fn.alerta = function(obj) {
    if(!obj){
        console.info('Funcion de alerta bootstrap\r\nparametros por medio de un objeto\r\n\ttitle : titulo de la alerta\r\n\ttexto : texto que contendrá la alerta\r\n\ttype : puede ser /warning/,/info/,/error/,/success/, no es necesario\r\n\tbtnCancelar :  determina si se muestra o no cancelar\r\n\tbtnClass : btnClass clase del boton aceptar\r\n\tbtnConfirmtx : texto del boton aceptar\r\n\tcloseOnConfirm : se cierra al confirmar true|false\r\n\tcloseOnCancel : se cierra al cancelar true|false\r\n\tonClose: funcion que hará al dar aceptar o cancelar se recomienda que la funcion lea la accion mediane la recepción de un parametro');
        console.info('ejemplo: fn.alerta({title:"hola",text:"mundo",type:"info",onClose:function(e){console.log(e);}})');
        return;
    }

    var title          = obj.title ? obj.title : "";
    var text           = obj.text ? obj.text : "";
    var type           = obj.type ? obj.type : "";
    var btnCancelar    = obj.btnCancelar ? obj.btnCancelar : false;
    var btnClass       = obj.btnClass ? obj.btnClass : "btn-info";
    var btnConfirmtx   = obj.btnConfirmtx ? obj.btnConfirmtx : "Aceptar";
    var closeOnConfirm = obj.closeOnConfirm ? obj.closeOnConfirm : true;
    var closeOnCancel  = obj.closeOnCancel ? obj.closeOnCancel : true;
    var onClose        = typeof obj.onClose == "function" ? obj.onClose : "";

    if (onClose == "") {
        swal({
            title             : title,
            text              : text,
            type              : type,
            showCancelButton  : btnCancelar,
            confirmButtonClass: btnClass,
            confirmButtonText : btnConfirmtx,
            closeOnConfirm    : closeOnConfirm,
            closeOnCancel     : closeOnCancel
        });
    } else {
        swal({
            title             : title,
            text              : text,
            type              : type,
            showCancelButton  : btnCancelar,
            confirmButtonClass: btnClass,
            confirmButtonText : btnConfirmtx,
            closeOnConfirm    : closeOnConfirm,
            closeOnCancel     : closeOnCancel
        }, onClose);
    }

    $('.sweet-alert .confirm ').focus();
};/*fn.alerta
fn.alerta({title:'hola',text:'mundo',type:'info',onClose:'function(e){
    console.log(e);
}'})
*/

fn.unformatMoney = function(txt,allow0){
    fn.allow0(allow0);
    console.log(txt);
    return accounting.unformat(txt);
}

/****************** Funciones jQuery ******************/
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || "");
        } else {
            o[this.name] = this.value || "";
        }
    });
    return o;
};

fn.quitaVaciosArr = function(obj){
    return _.reject(obj, function(j){ return _.size(j)==0; });
}

fn.validaObligatorio = function(obj) {

    var valorIngresado = $("[required]");
    
    for(i = 0; i <= valorIngresado.length; i++) {
        var valorIngresadoIndividual = $(valorIngresado[i]).val();
        if( valorIngresadoIndividual === "") {
            return false;
        };
    };
}