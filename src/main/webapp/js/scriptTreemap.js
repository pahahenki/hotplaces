/*mise en place des premiers rectangle pour le treemap*/
var root = d3.select('#chart').append('svg')
	.attr('width',600)
	.attr('heigth',600)
	.style('border','1px solid black');

var rects = [
	{x: -5, y: -5, w: 150, h: 195},
	{x: -5, y: 200, w: 150, h: 230},
  	{x: 155, y:  -5, w: 450, h: 435, fill: '#731000'},
  	{x: 10, y:  10, w: 10, h: 10, fill: '#731000'},

	];


root.selectAll('rect')
    .data(rects).enter()
  .append('rect')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .attr('width', function(d) { return d.w; })
    .attr('height', function(d) { return d.h; })
    .attr('fill', function(d) { return d.fill || '#eef2d1'; })
    .attr('stroke-width', 10)
    .attr('stroke', 'black');