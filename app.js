define(['angular', 'jquery',], function (angular, $) {

	 //console.log('?',$);

	 $('.up-button').click(function(){scroll(-75)});
	 $('.down-button').click(function(){scroll(75)});
	 

	 function scroll(amt) {

	 	var scrolly =   $(window).scrollTop() + amt
	 	console.log('scrolling...',scrolly);
	 	$('html, body').stop().animate(
	 		{scrollTop: scrolly}, 120
	 	)
	 
	 };

  return angular.module('gameApp', ['btford.markdown']);


  
});