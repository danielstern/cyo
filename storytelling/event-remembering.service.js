define(['app'] , function (app) {
	app.service('eventService', function() {

		this.allThingsPassed = [];
		this.somethingHappened = function(thing) {
			this.allThingsPassed = this.allThingsPassed.concat(thing);
		}

		this.didThisHappen = function(thing) {
			console.log("All events?",this.allThingsPassed);
			if (_.isArray(thing)) thing = thing[0]
			if (_.contains(this.allThingsPassed, thing)) return true;
		}
	});
})
