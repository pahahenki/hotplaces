var margin = {top: 50, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    formatNumber = d3.format(",d"),
    color = d3.scale.category20(),
    transitioning;
 
var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);
 
var y = d3.scale.linear()
    .domain([0, height])
    .range([0, height]);
 
var treemap = d3.layout.treemap()
    .children(function(d, depth) { return depth ? null : d.children; })
    .sort(function(a, b) { return a.value - b.value; })
    .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
    .round(false)
    .value(function(d) { return d.size? d.size : 3000 ; });
 
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .attr("onmouseout", "unHightLight(undefined);")
    .style("margin-left", -margin.left + "px")
    .style("margin.right", -margin.right + "px")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("shape-rendering", null);
 
var grandparent = svg.append("g")
    .attr("class", "grandparent");