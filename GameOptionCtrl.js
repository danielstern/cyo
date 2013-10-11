define(['app'], function (app) {
  app.controller('GameOptionCtrl', ['$scope',
  	function($scope) {	
  		console.log("Game option ctrl booted.");
  		$scope.story = [1,2,3];

  	}
  ])
})