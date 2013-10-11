require.config({
  paths: {
    jquery: 'lib/jquery/jquery-2.0.3.min',
    underscore: 'lib/underscore/underscore-min',
    underscore_string: 'lib/underscore/underscore.string.min',
    angular: 'lib/angular/angular.min',
    bootstrap: 'lib/bootstrap/js/bootstrap.min',
    d3: 'lib/d3/d3.min',
  },
  shim: {
  	'underscore_string': {
	    exports: '_.str',
	  },
	  'bootstrap': {
	 	  deps: ['jquery'],
	  },
	  'underscore': {
	  	deps: ['underscore_string'],
	    exports: '_',
	    init: function(_str) {

	    	_.mixin(_str.exports());

	    }
	  },
	  'angular': {
	      exports: 'angular'
	  },
	},
	urlArgs: "k=" + parseInt(Math.random() * 1000).toString(16),
	priority: [
		'angular'
	],
	map: {
  '*': {
    'css': 'lib/require-css/css' // or whatever the path to require-css is
  	}
	}
});

require([
	"jquery",
	"app",
	"angular",
	"d3",
	"bootstrap",

	"storytelling/game-option.directive",
	"storytelling/storyPart",
	"storytelling/event.directive",
	"storytelling/event-remembering.service",

	"global/analytics",

	], function($, app, angular) {

   	angular.bootstrap(document , ['gameApp']);
		
})

