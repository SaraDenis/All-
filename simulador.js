function showSimulator(){
	$("#botonS").click(function(){
		$("#datosSU").show();
		$("#resultSU").show();
		$("#comparison").show();
		$("#gain").show();
		$("#charts").show();
	});
}
function SinSalesup() {
	var day = document.getElementById("day").value;
	var time = document.getElementById("time").value;
	var quotes = document.getElementById("quotes").value;
	var hours = document.getElementById("hours").value;
	var sales = document.getElementById("sales").value;
	var salary = document.getElementById("salary").value;
	var result1=document.getElementById("Result1");
	var result2=document.getElementById("Result2");
	var result3=document.getElementById("Result3");
	var result4=document.getElementById("Result4");
	var result5=document.getElementById("Result5");
	var result6=document.getElementById("Result6");
	var result7=document.getElementById("Result7");

	result1 = quotes/day;
	jQuery("#Result1").val(result1.toFixed(1));
	result2 = result1*time;
	jQuery("#Result2").val(result2.toFixed(1));
	result3 = (result2/(hours*60))*100;
	jQuery("#Result3").val(result3.toFixed(0)+"%");
	result4 = (time*quotes*sales)/60;
	jQuery("#Result4").val(result4.toFixed(1));
	result5 = (salary/day/hours/60)*time;
	jQuery("#Result5").val(result5.toFixed(1));
	result6 = result5*quotes*sales;
	jQuery("#Result6").val(result6.toFixed(1));
	result7 = (time*quotes*sales)/60/8;
	jQuery("#Result7").val(result7.toFixed(1));

	var timeSU = 2;
	var result1SU=document.getElementById("Result1SU");
	var result2SU=document.getElementById("Result2SU");
	var result3SU=document.getElementById("Result3SU");
	var result4SU=document.getElementById("Result4SU");
	var result5SU=document.getElementById("Result5SU");
	var result6SU=document.getElementById("Result6SU");
	var result7SU=document.getElementById("Result7SU");

	result1SU = result1;
	jQuery("#Result1SU").val(result1SU.toFixed(1));
	result2SU = result1SU*timeSU;
	jQuery("#Result2SU").val(result2SU.toFixed(1));
	result3SU = (result2SU/(hours*60))*100;
	jQuery("#Result3SU").val(result3SU.toFixed(0)+"%");
	result4SU = (timeSU*quotes*sales)/60;
	jQuery("#Result4SU").val(result4SU.toFixed(1));
	result5SU = (salary/day/hours/60)*timeSU;
	jQuery("#Result5SU").val(result5SU.toFixed(1));
	result6SU = result5SU*quotes*sales;
	jQuery("#Result6SU").val(result6SU.toFixed());
	result7SU = (timeSU*quotes*sales)/60/8;
	jQuery("#Result7SU").val(result7SU.toFixed(1));

/* comparaciones */
	jQuery("#actual1").val(result2.toFixed(1));
	jQuery("#actual2").val(result4.toFixed(1));
	jQuery("#actual3").val(result6.toFixed(1));
	jQuery("#actual4").val(result7.toFixed(1));
	var reActual5 = quotes*time/60/hours;
	jQuery("#actual5").val(reActual5.toFixed(1));

	jQuery("#conSU1").val(result2SU.toFixed(1));
	jQuery("#conSU2").val(result4SU.toFixed(1));
	jQuery("#conSU3").val(result6SU.toFixed());
	jQuery("#conSU4").val(result7SU.toFixed(1));
	var reConSU5 = quotes*timeSU/60/hours;
	jQuery("#conSU5").val(reConSU5.toFixed(1));


	var comparison1 = document.getElementById("Result2").value;
	var comparison2 = document.getElementById("Result2SU").value;
	var Cvar1 = (comparison2/comparison1-1)*100;

	var comparison3 = document.getElementById("Result4").value;
	var comparison4 = document.getElementById("Result4SU").value;
	var Cvar2= (comparison4/comparison3-1)*100;

	var comparison5 = document.getElementById("Result6").value;
	var comparison6 = document.getElementById("Result6SU").value;
	var Cvar3 = comparison6-comparison5;

	var comparison7 = document.getElementById("Result7").value;
	var comparison8 = document.getElementById("Result7SU").value;
	var Cvar4 = comparison7-comparison8;

	var comparison9 = document.getElementById("actual5").value;
	var comparison10 = document.getElementById("conSU5").value;
	var Cvar5 = comparison9-comparison10;

	jQuery("#var1").val(Cvar1.toFixed()+"%");
	jQuery("#var2").val(Cvar2.toFixed()+"%");
	jQuery("#var3").val(Cvar3.toFixed(2));
	jQuery("#var4").val(Cvar4.toFixed());
	jQuery("#var5").val(Cvar5.toFixed(1));

	jQuery("#gain1").val(result6.toFixed(1));
	jQuery("#gain2").val(result6SU.toFixed());
	var Rgain1 = salary*sales;
	jQuery("#Tgain1").val(Rgain1.toFixed(1));
	
	
	var Tsalary = Rgain1-result6; 
	jQuery("#salary1").val(Tsalary.toFixed(2));
	jQuery("#Tgain2").val(Rgain1.toFixed(1));
	var Tsalary2 = Rgain1-result6SU; 
	jQuery("#salary2").val(Tsalary2.toFixed(2));	
}

