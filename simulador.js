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

	var form={
		day:day.value,
		time:time.value,
		quotes:quotes.value,
		hours:hours.value,
		sales:sales.value,
		salary:salary.value
	};

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
}
function ConSalesup(){
	var daySU = document.getElementById("daySU").value;
	var timeSU = document.getElementById("timeSU").value;
	var quotesSU = document.getElementById("quotesSU").value;
	var hoursSU = document.getElementById("hoursSU").value;
	var salesSU = document.getElementById("salesSU").value;
	var salarySU = document.getElementById("salarySU").value;
	var result1SU=document.getElementById("Result1SU");
	var result2SU=document.getElementById("Result2SU");
	var result3SU=document.getElementById("Result3SU");
	var result4SU=document.getElementById("Result4SU");
	var result5SU=document.getElementById("Result5SU");
	var result6SU=document.getElementById("Result6SU");
	var result7SU=document.getElementById("Result7SU");

	result1SU = quotesSU/daySU;
	jQuery("#Result1SU").val(result1SU.toFixed(1));
	result2SU = result1SU*timeSU;
	jQuery("#Result2SU").val(result2SU.toFixed(1));
	result3SU = (result2SU/(hoursSU*60))*100;
	jQuery("#Result3SU").val(result3SU.toFixed(0)+"%");
	result4SU = (timeSU*quotesSU*salesSU)/60;
	jQuery("#Result4SU").val(result4SU.toFixed(1));
	result5SU = (salarySU/daySU/hoursSU/60)*timeSU;
	jQuery("#Result5SU").val(result5SU.toFixed(1));
	result6SU = result5SU*quotesSU*salesSU;
	jQuery("#Result6SU").val(result6SU.toFixed(1));
	result7SU = (timeSU*quotesSU*salesSU)/60/8;
	jQuery("#Result7SU").val(result7SU.toFixed(1));
}

function Comparaciones(){
	var actual1 = document.getElementById("actual1");
	var actual2 = document.getElementById("actual2");
	var actual3 = document.getElementById("actual3");
	var actual4 = document.getElementById("actual4");
	var actual5 = document.getElementById("actual5");
	var conSU1 = document.getElementById("conSU1");
	var conSU2 = document.getElementById("conSU2");
	var conSU3 = document.getElementById("conSU3");
	var conSU4 = document.getElementById("conSU4");
	var conSU5 = document.getElementById("conSU5");
	var var1 = document.getElementById("var1");
	var var2 = document.getElementById("var2");
	var var3 = document.getElementById("var3");
	var var4 = document.getElementById("var4");
	var var5 = document.getElementById("var5");
	
	jQuery("#actual1").val(result2);
}