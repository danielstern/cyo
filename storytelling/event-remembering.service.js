define(['app'] , function (app) {
	app.service('eventService', function() {

		this.allThingsPassed = [];
		window.atp = this.allThingsPassed;
		this.somethingHappened = function(thing) {
			console.log("Event logged...",thing);
			this.allThingsPassed = this.allThingsPassed.concat(thing);
		}

		this.didThisHappen = function(thing) {
			if (_.isArray(thing)) thing = thing[0]
			if (_.contains(this.allThingsPassed, thing)) return true;
		}

		this.itDidNotHappen = function(thing) {
			console.log("Event cancelled...",thing);
			if (_.isArray(thing)) thing = thing[0]
			this.allThingsPassed = _.without(this.allThingsPassed, thing);
		}
	});
})
