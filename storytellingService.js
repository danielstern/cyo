define(['app'] , function (app) {
	app.service('storytellingService', function() {

		this.getPage = function(pageSlug) {
				console.log("Getting page...",pageSlug);

				var po = {} // page object;
				po.url = pageSlug;

				return po;
		}
	});
})