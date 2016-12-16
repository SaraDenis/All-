var sql = require ('mssql');
var fs = require ('fs');
var _ = require ('underscore');

var confdbStr = fs.readFileSync ('./config/db.json');
var config = JSON.parse (confdbStr);


function sqlType (theType) {

  if (theType == undefined) {
    var err = new Error ('The sql param datatype is undefined!');
    throw err;
  }

  theType = theType.toLowerCase();
  
  
  if ( (theType == 'text') || (theType== 'varchar') ) { return sql.VarChar } else
  if ( (theType == 'integer') || (theType == 'int') ) { return sql.Int } else

  {
    // invalid type...
    var err = new Error ('The sql type '+ theType + ' is invalid!');
    throw err;
  }



}


function prepareSQLParams (SQLtext, reqParams, dbrequest) {
  var txt = SQLtext.trim();
  var i = txt.indexOf(']');
  var pValue; 

  if (txt.substring(0,3)=='--[') {  
    
    var params = JSON.parse (txt.substring (2,i+1));
        
    if (params) {
      for (var i=0; i< params.length; i++) {
        Object.keys(params[i]).forEach(function (key) {
          pValue = reqParams[key];
          dbrequest.input (key, sqlType (params[i][key]), pValue);
        });

      } // for      
    }
  }

} // prepareSQLParams


exports.execSQL= function (file, req, res) {
  var dbConn = new sql.Connection (config);

  /* get the sql from the file */
  var aFile = './SQL/' + file;
  var SQLText = fs.readFileSync (aFile, 'utf8');
  

  /* Parameter values for the SQL:*/
  

  var oParams = req.params;
  var oQuery  = req.query;
  var oBody   = req.body;
  var reqParams = {};

  _.extend (reqParams, oParams, oQuery, oBody);


  console.log ('params: ',req.params);
  console.log ('Query: ',req.query);
  console.log ('Body: ',req.body);
  console.log ('Todos: ',reqParams);


  /* run the query */

  dbConn.connect().then (function () {

  	 var sqlRequest = new sql.Request (dbConn);

     prepareSQLParams (SQLText, reqParams, sqlRequest);

  	 sqlRequest.query(SQLText).then (function (recordSet) {
  	 	
  	 	res.send (recordSet);
  	 	dbConn.close();  	 	

  	 }).catch ( function (err) {

  	 	console.log ('SQL Error: ',err);
  	 	dbConn.close();

  	 }) // error on query
  }).catch (function (connErr) {  	

  	console.log ('Conection error: ',connErr);

  })
  
} 