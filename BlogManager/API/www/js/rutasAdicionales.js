var multer      = require('multer')
var upload      = multer();
var AWSManager  = require('./bucket');
var zipFolder   = require('zip-folder');
var appConfig   = require('../config/config').config;


var path = require('path');
var appDir = path.dirname(require.main.filename);

var rutasAdicionales = function(){
  return {
  	cargaAdicionales(app){

  		app.get('/archivo', function(req, res){
		  res.send('<form action="archivo" method="post" enctype="multipart/form-data">'
		    + '<p>Image: <input type="file" name="imagen" /></p>'
		    + '<p><input type="hidden" name="filename" value="foto.png" /></p>'
		    + '<p><input type="submit" value="Upload" /></p>'
		    + '</form>');
		});

		app.get('/download', function(req, res){
			zipFolder(appDir + appConfig.directorioSalida, './sitio.zip', function(err) {
			    if(err) {
			       console.log('oh no!', err); 
			       res.status(501).send({res:2, msg:err}).end();
			    } else {
			        res.download('/sitio.zip');			    }
			});

		});

		app.get('/archivoEliminar',function (req, res,next) {
			console.log(req.query);
			if (!req.query.archivo){
				 return res.status(403).send({res:1, msg:'Se esperaba el nombre de un archivo'}).end();
			}
			else{
				archivo = req.query.archivo;
				AWSManager.eliminarArchivo(archivo, function(err, data){
					if (err)
						 return res.status(501).send({res:2, msg:err}).end();
					else
						return res.send({res:0, msg:"Archivo eliminado"}).end();	
				});
			}
		});


		app.post('/archivo', upload.fields([{ name: 'imagen', maxCount: 1 }]), function (req, res,next) {
			console.log(req.files);
			console.log(req.body);
		 	if (!req.files || !req.files.imagen[0]) {
		        return res.status(403).send({res:1, msg:'Se esperaba un archivo llamado imagen'}).end();
		    }
		    var imagen = req.files.imagen[0];
		    console.log(imagen.mimetype);

		    if (!/^image\/(jpe?g|png|gif)$/i.test(imagen.mimetype)) {
		        return res.status(403).send({res:1, msg:'archivo inválido'}).end();
		    }

		    var pid = '10000' + parseInt(Math.random() * 10000000);
		    var nombreArchivo = pid.toString()+'.png';

		    var params = {nombre: nombreArchivo, archivo: imagen.buffer ,mime:imagen.mimetype};

		    AWSManager.subirArchivo(params, function(err, data){
		    	if (err)
		    		res.status(500).send(err)
		    	else{
		    		console.log(data);
		    		res.send({res:1, msg: nombreArchivo});
		    	}
		    });

		})
  	}
  }
}

exports.rutasAdicionales = rutasAdicionales;