$(document).on('mouseleave',function(){
 	if (event.pageY<=1) {
 		$(".modalP").fadeIn();
 	}
    $(".cerrarP").click(function(){
     
        $(".modalP").fadeOut(300);
    });
});