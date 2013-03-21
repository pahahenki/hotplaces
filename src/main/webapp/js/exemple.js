/*source pour aide : http://www.dashingd3js.com/using-json-to-simplify-code
https://github.com/mbostock/d3/wiki/Treemap-Layout
http://mbostock.github.com/d3/talk/20111018/treemap.html
http://www.jeromecukier.net/blog/2012/09/04/getting-to-hello-world-with-d3/*/

/*variables pour la gestion du treemap*/
var width = 800,
    height = 600,
    color = d3.scale.category20c();
/*json structure*/
var json = {
    "name": "tags",
    "children": [
        {"name":"paravant", "size": 10},
        {"name":"parapente", "size": 20},
        {"name":"parapluie", "size": 30},
        {"name":"paratonnere", "size": 40},
        {"name":"parasol", "size": 50},
        {"name":"parafoudre", "size": 60},
    ]
};

/*creation du treemap*/
var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .sort(function(a,b) { return a.size - b.size; })/*trie décroissant*/
    .round(true)
    .value(function(d) { return d.size; });

/*fonction qui revoie les coordonnees dans la representation*/
function cell() {
    this 
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

var div = d3.select('.hashtags');
/*ecriture du treemap*/
div.data([json]).selectAll('div')
   .data(treemap.nodes)
  .enter().append("div")
   .attr("class", "cell")
   .call(cell)
   .text(function(d) { return d.children ? null : d.name; });