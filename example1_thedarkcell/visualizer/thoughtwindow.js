define(['app'], function (app) {
  app.directive('thoughtwindow', [function () {
    return {
      scope: {
        number:'=',
      },
      restrict: 'AE',
      
      template: function (a, b) {
        return "<div fadeInThoughts><div class='hidden'>"+a.text()+"</div><div class='content'></div></div>";
      },
      link: function (scope, elem, attrs) {
        var count = scope.number || 1;
        var txt = elem.find('.hidden').text();
        txt = txt.replace(/[\n]/gi, '');
        var ideas = txt.split(',');
        ideas = _(ideas)
          .chain()
          .map(function(idea){
            return _.trim(idea);
          })
          .compact()
          .sample(count)
          .value();
        


        var svg = d3.select(elem[0])

        svg
        .selectAll('text.q')
        .data(ideas)
        .enter()
        .append('text')
        .text(function(a,b){
          return a;
        })
        //.attr('class','white-text pull-right-in-slow')
        .attr('class','white-text fade-in-out transparent')
    //    .attr('class','white-text')
        .style('position','absolute')
        .style('top',function(){
          return Math.random() * 100 + 'px';
        })
        .style('left',function(){
          return Math.random() * 100 + 'px';
        })
        .style('font-size', function(){
          return Math.random() * 34 + 'px';
        })

    
      },
    }
  }]);
})