function showSimulator(datos){
  $("#botonS").click(function(){
   // $("#ResultadosSin").show();
    $("#comparison").show();
    $("#gain").show();
    $("#graficas").show();
    sinSalesup();      
    });
}

function sinSalesup() {
  var day = 22;
  var times = document.getElementById("times").value;
  var quotes = document.getElementById("quotes").value;
  var hours = document.getElementById("hours").value;
  var sales = document.getElementById("sales").value;
  var salary = document.getElementById("salary").value;
  var result1, result2, result3, result4, result5, result6, result7;
  var timeSU = 2;
  var result1SU, result2SU, result3SU, result4SU, result5SU, result6SU, result7SU;
  var res=jQuery("#Result1");
  /*Tabla de Resultados*/
  result1 = quotes/day;
  res.val(result1.toFixed(1));
  result2 = result1*times;
  jQuery("#Result2").val(result2.toFixed(1));
  result3 = (result2/(hours*60))*100;
  jQuery("#Result3").val(result3.toFixed(0)+"%");
  result4 = (times*quotes*sales)/60;
  jQuery("#Result4").val(result4.toFixed(1));
  result5 = (salary/day/hours/60)*times;
  jQuery("#Result5").val(result5.toFixed(1));
  result6 = result5*quotes*sales;
  jQuery("#Result6").val(result6.toFixed(1));
  result7 = (times*quotes*sales)/60/8;
  jQuery("#Result7").val(result7.toFixed(1));

  /*Tabla de resultados con SU*/
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
  var reActual5 = quotes*times/60/hours;
  jQuery("#actual5").val(reActual5.toFixed(1));

  jQuery("#conSU1").val(result2SU.toFixed(1));
  jQuery("#conSU2").val(result4SU.toFixed(1));
  jQuery("#conSU3").val(result6SU.toFixed());
  jQuery("#conSU4").val(result7SU.toFixed(1));
  var reConSU5 = quotes*timeSU/60/hours;
  jQuery("#conSU5").val(reConSU5.toFixed(1));

  /*Tabla de comparaciones finales*/
  var comparison1 = document.getElementById("Result2").value;
  var comparison2 = document.getElementById("Result2SU").value;
  var Cvar1 = (comparison2-comparison1);
  var comparison3 = document.getElementById("Result4").value;
  var comparison4 = document.getElementById("Result4SU").value;
  var Cvar2= (comparison4/comparison3-1)*100;
  var comparison5 = document.getElementById("Result6").value;
  var comparison6 = document.getElementById("Result6SU").value;
  var Cvar3 = comparison5-comparison6;
  var comparison7 = document.getElementById("Result7").value;
  var comparison8 = document.getElementById("Result7SU").value;
  var Cvar4 = (comparison8/comparison7-1)*100;
  var comparison9 = document.getElementById("actual5").value;
  var comparison10 = document.getElementById("conSU5").value;
  var Cvar5 = comparison9-comparison10;

  jQuery("#var1").val(Cvar1.toFixed());
  jQuery("#var2").val(Cvar2.toFixed()+"%");
  jQuery("#var3").val(Cvar3.toFixed(2));
  jQuery("#var4").val(Cvar4.toFixed()+"%");
  jQuery("#var5").val(Cvar5.toFixed(1));

  /*Tabla Cotizaciones finales*/
  jQuery("#gain1").val(result6.toFixed(1));
  jQuery("#gain2").val(result6SU.toFixed());
  var Rgain1 = salary*sales;
  jQuery("#Tgain1").val(Rgain1.toFixed(1));
  var Tsalary = Rgain1-result6; 
  jQuery("#salary1").val(Tsalary.toFixed(2));
  jQuery("#Tgain2").val(Rgain1.toFixed(1));
  var Tsalary2 = Rgain1-result6SU; 
  jQuery("#salary2").val(Tsalary2.toFixed(2));  

var dato1=Math.round(result2);
    var dato2=Math.round(result2SU);
    var pieData = [
                      {
                        value: dato1,
                        color:"#8c4a09",
                        highlight: "#0c62ab",
                        label: "Actual"
                      },
                      {
                        value: dato2,
                        color: "#590c73",
                        highlight: "#a6429b",
                        label: "Con Sales Up!"
                      }
                    ];
              var ctx = document.getElementById("chart-area").getContext("2d");
              window.myPie = new Chart(ctx).Pie(pieData); 

  var datoS=Math.round(result6);
  var datoC=Math.round(result6SU);
  var barChartData = {
    labels : ["Comparación"],
    datasets : [
      {
        fillColor : "#6b9dfa",
        strokeColor : "#ffffff",
        highlightFill: "#1864f2",
        highlightStroke: "#ffffff",
        data : [datoS]
      },
      {
        fillColor : "#e9e225",
        strokeColor : "#ffffff",
        highlightFill : "#ee7f49",
        highlightStroke : "#ffffff",
        data : [datoC]
      }
    ]

  }
  var ctx3 = document.getElementById("chart-area3").getContext("2d");
  window.myPie = new Chart(ctx3).Bar(barChartData);  


  var cotizacion=Math.round(result6);
  var mensual=Math.round(Tsalary);
  var pieData = [
          {
            value: cotizacion,
            color:"#0b82e7",
            
            highlight: "#af7115",
            label: "Cotizaciones"
          },
          {
            value: mensual,
            color: "#e29a15",
            highlight: "#af7115",
            label: "sueldo mensual"
          }
        ];
  var ctx2 = document.getElementById("chart-area2").getContext("2d"); 
  window.myPie = new Chart(ctx2).Doughnut(pieData); 
}
