    'use strict';

    var AWS       = require('aws-sdk');
    var appConfig = require('../config/config').config;
    AWS.config.update(appConfig.bucketParams);

    var s3 = new AWS.S3();
	var bucket = appConfig.bucketFolder;


    var AWSManager = new function (){
    	var manager = {};

    	manager.subirArchivo = function(opts, callback){
		    var options = {
		        Bucket       : bucket,
		        Key          : opts.nombre,
                Body         : opts.archivo,
                ContentType  : opts.mime,
                ACL          : 'public-read'
		    };
            s3.putObject(options, callback);	    
    	}

        manager.eliminarArchivo = function(archivo,callback){
            var options = {
                Bucket       : bucket,
                Key          : archivo,
            };
            s3.deleteObject(options, callback);        

        }
    	return manager;
    }



    module.exports =  AWSManager;