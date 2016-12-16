var x = '[{"idcompania":"int", "idx":12}]';

var obj = JSON.parse (x);

if (obj) {
	for (var i=0; i< obj.length; i++)

	Object.keys(obj[i]).forEach(function (key) {
	      console.log( key , obj[i][key] );
	});
}





