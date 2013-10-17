define(['app'], function (app) {
  app.directive('thoughtwindow', [function () {
    return {
      restrict: 'AE',
      
      template: function (a, b) {
        return "<div fadeInThoughts><div class='hidden'>"+a.text()+"</div></div>";
      },
      link: function (scope, elem, attrs) {
        var txt = elem.find('.hidden').text();
        txt = txt.replace(/[\n]/gi, '');
        var ideas = txt.split(',');
        ideas = _(ideas).chain().map(function(idea){
          return _.trim(idea);
        })
        .compact()
        .value();
        console.log("Thought window init...", ideas);
      },
    }
  }]);
})