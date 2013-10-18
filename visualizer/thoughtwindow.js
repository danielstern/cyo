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
          .sample(3)
          .value();
        

        console.log("Thought window init...", ideas, elem);

        var svg = d3.select(elem[0])
        .select('.content')
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0,0,100,100");


        svg
        //.append('text')
        .selectAll('text.q')
        .data(ideas)
        .enter()
        .append('text')
        .text(function(a,b){
          console.log("applying text...",a,b);
          return a;
        })
        //.attr('class','white-text pull-right-in-slow')
        .attr('class','white-text fade-in-out')
    //    .attr('class','white-text')
        .attr('y',function(){
          return Math.random() * 100;
        })
        .attr('x',function(){
          return Math.random() * 100;
        })
        .attr('font-size', function(){
          return Math.random() * 12;
        })
        .attr('opacity', function(){
         // return Math.random() * 1;
         return 0;
        })
        //.on('mouseover',blur)
      //  .attr('filter','url(#blur)')
       // .append('filter')
       // .attr('id',function(e,i){return 'blur' + i})
       // .append('feGaussianBlur')
       // .attr("stdDeviation", 6);

        function blur(){
          console.log("blurring...")
          filter.attr("stdDeviation",1)
        }
     
      var filter = svg.append('defs')
        .append('filter')
        .attr('id','blur')
        .append('feGaussianBlur')
         .attr("stdDeviation", 2);

      },
    }
  }]);
})