define(['app'], function (app) {
  app.controller('GameCtrl', ['$scope',
  	function($scope) {	
  		console.log("Main game controller booted.");
  		$scope.story = [1,2,3];

  	}
  ])
})