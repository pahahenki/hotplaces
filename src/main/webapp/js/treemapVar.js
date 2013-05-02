/*
**variables: margin width height formatNumber color transitioning
**description: definition for the aspect of treemap with d3.js
*/
var margin = {top: 50, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    formatNumber = d3.format(",d"),
    color = d3.scale.category20(),
    transitioning;

/*
**variable: x
**description: variable corresponding to a x axis create with svg and d3.js library
*/ 
var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);

/*
**variable: y
**description: variable corresponding to a y axis create with svg and d3.js library
*/ 
var y = d3.scale.linear()
    .domain([0, height])
    .range([0, height]);

/*
**variable: treemap
**description:here the call for the D3.js function who create our treemap, contains all parameters like size of a node
*/ 
var treemap = d3.layout.treemap()
    .children(function(d, depth) { return depth ? null : d.children; })
    .sort(function(a, b) { return a.value - b.value; })
    .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
    .round(false)
    .value(function(d) { return d.size? d.size : 3000 ; });

/*
**variable: svg
**description: here a call for d3.select function who take/create svg elements and call recursively a g svg element
*/ 
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .attr("onmouseout", "unHighLight(undefined);")
    .style("margin-left", -margin.left + "px")
    .style("margin.right", -margin.right + "px")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("shape-rendering", null);

/*
**variable: grandparent
**description:definition of grandparent notion,append svg element with a recursive g element
*/ 
var grandparent = svg.append("g")
    .attr("class", "grandparent");

//current element hignlighted
var memEletSelect ;
