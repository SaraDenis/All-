$("html").ready(function(){
	function ValidaEsCorreo(v){
      var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return re.test(v);
    }
});
$( document ).on( "mouseleave", function() {
	if (localStorage.getItem("tiempo")===null) { 
		if (event.pageY<=1) {
		$(".modalP").fadeIn();
		}
		$(".cerrarP").click(function(){
		localStorage.setItem('tiempo', 1); 
		$(".modalP").fadeOut(300);
		});
	}
});