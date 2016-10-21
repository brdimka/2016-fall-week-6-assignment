console.log('6.1');


//First, append <svg> element and implement the margin convention
var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');

//Import data and parse

d3.csv('../data/olympic_medal_count.csv',parse,function(err, rows){


  var minX = d3.min(rows,function(d){return d.count1990}),
      maxX = d3.max(rows,function(d){return d.count1990});
  var scaleX = d3.scaleLinear()
      .domain([0, maxX])
      .range([0,w]);
  var scaleY = d3.scaleLinear()
      .domain([0,maxX])
      .range([h,0]);

rows.sort(function(b,a){
    return a.count1990 - b.count1990;

rows.slice(0,10);

})



console.log(rows);

  //nodes
/*  var nodes = plot.selectAll('.name')
      .data(rows)
      .enter()
      .append('g')
      .attr('class','country')
      .attr('transform',function(d){
          return 'translate('+scaleX(d.count1990)+','+scaleY(d.count1990)+')';
      });

  nodes.append('circle')
      .attr('r',20);
  nodes.append('text')
      .text(function(d){return d.count1990});
*/


  //bars
  var bars = plot.selectAll('.name')
        .data(rows)
        .enter()
        .append('g')
        .attr('class','country')
        .attr('transform',function(d){
            return 'translate('+scaleX(d.count1990)+','+scaleY(d.count1990)+')';
        });

    bars.append('rect')
        .attr('width',10)
        .attr('y',0)
        .attr('height',function(d){
          return scaleX(d.count1990)
        })
        .attr('fill','black');



//        .attr('y', function(d){
//            return 'translate('scaleY(d.count1990)')';
//    bars.append('text')
  //      .text(function(d){return d.count1990});

  //vertical axis
  var axisX = d3.axisBottom()
      .scale(scaleX)
      .tickSize(-h);
  var axisY = d3.axisLeft()
      .scale(scaleY)
      .tickSize(-w);
  plot.append('g').attr('class','axis axis-x')
      .attr('transform','translate(0,'+h+')')
      .call(axisX);
  plot.append('g').attr('class','axis axis-y').call(axisY);
});

function parse(d){
  if(d['Country Name']=='..' || d['1900']=='..' || d['1960']=='..' || d['2012']=='..'){
      return;
  }

  return {
      name:d['Country Name'],
      count1990:+d['1900'],
      count1960:+d['1960'],
      count2012:+d['2012'],
  }
}
