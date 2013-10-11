define(['app'] , function (app) {
	app.service('eventService', function() {

		this.allThingsPassed = [];
		this.somethingHappened = function(thing) {
			this.allThingsPassed = this.allThingsPassed.concat(thing);
		}
	});
})
