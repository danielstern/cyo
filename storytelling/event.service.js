define(['app'] , function (app) {
	app.service('eventService', function() {

		this.allThingsPassed = [];
		this.allPages = [];
	//	window.atp = this.allThingsPassed;

		this.somethingHappened = function(thing) {
			this.allThingsPassed = this.allThingsPassed.concat(thing);
		}

		this.didItHappen = function(condition, neg) {

			var r = false;

			if (_.isArray(condition)) condition = _.keysToKeyword(condition);

			if (_.beginsWithNumber(condition)) {
				var data = _.compoundToObject(condition);
				if (_.count(this.allThingsPassed, data.target) >= data.attribute) r = true;
			}

			if (_.contains(this.allThingsPassed, condition)) r = true;

			if (neg) r = !r;

			return r;
		}

		this.logChapter = function(page) {
			this.allPages = this.allPages.concat(page);
		}

		this.getAllThingsPassed = function() {
			return this.allThingsPassed;
		}

		this.getAllPages = function() {
			return this.allPages;
		}

		this.clearEvent = function(thing) {
			this.allThingsPassed = _.without(this.allThingsPassed, thing);
		}

		this.clearAll = function() {
			this.allThingsPassed = [];
		}
	});
})
