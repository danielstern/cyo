require.config({
  paths: {
    jquery: 'lib/jquery/jquery-2.0.3.min',
    underscore: 'lib/underscore/underscore-min',
    underscore_string: 'lib/underscore/underscore.string.min',
    angular: 'lib/angular/angular.min',
    bootstrap: 'lib/bootstrap/js/bootstrap.min',
    d3: 'lib/d3/d3.min',
    less: 'lib/less/less-1.3.3.min',
    showdown: 'lib/showdown/showdown',
    markdown: 'lib/angular/angular-markdown/markdown',
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
	  'markdown': {
	  	deps: ['angular'],
	  }
	},
//	urlArgs: "k=" + parseInt(Math.random() * 1000).toString(16),
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
	"less",
	"bootstrap",
	"showdown",
	"markdown",

	"storytelling/choice.directive",
	"storytelling/chapter.directive",
	"storytelling/crossroads.directive",
	"storytelling/ending.directive",
	"storytelling/condition.directive",
	"storytelling/story.directive",
	"storytelling/event.directive",
	"storytelling/event.service",
	
	"visualizer/thoughtwindow",
	"visualizer/hoverwindow",
	"visualizer/delay",

	"global/analytics",
	"global/utility",

	], function($, app, angular, d3) {

   	angular.bootstrap(document , ['gameApp']);
		
})

