'use strict';
var mysql   = require('mysql');
var queries = require('./queries').queries;
var pool    = mysql.createPool({
  connectionLimit : 10,
  host            : 'salesupblog.cwm1zqiti2cg.us-west-2.rds.amazonaws.com',
  user            : 'salesupuser',
  password        : '5a135uPi',
  database        : 'salesupblog'
});
 

var modelo  = new function(){
	function SQL(){
		
	}
	function SQLtoJSON(qry, res){
		pool.query(qry, function(err, rows, fields) {
		  if (err) throw err;
		  res.json(rows);
		  return rows;
		});
	}
	return {
		obtieneUsuarios : function(res){
			SQLtoJSON(queries.pruebaConexion, res)
		}
	}
};


exports.modelo = modelo;