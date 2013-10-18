define(['app'], function (app) {
  app.directive('thoughtwindow', [function () {
    return {
      restrict: 'AE',
      
      template: function (a, b) {
        return "<div fadeInThoughts><div class='hidden'>"+a.text()+"</div><div class='content'></div></div>";
      },
      link: function (scope, elem, attrs) {
        var txt = elem.find('.hidden').text();
        txt = txt.replace(/[\n]/gi, '');
        var ideas = txt.split(',');
        ideas = _(ideas)
          .chain()
          .map(function(idea){
            return _.trim(idea);
          })
          .compact()
          .value();
        

        console.log("Thought window init...", ideas, elem);

        var elem3 = d3.select(elem[0])
        .select('.content')
        .append('text')
        .text('12345');
        console.log('3elem?',elem3)

     

      },
    }
  }]);
})