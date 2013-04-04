var margin = {top: 50, right: 10, bottom: 10, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scale.category20c();

var treemap = d3.layout.treemap()
	.children(function(d, depth) { return depth===3 ? null : d.children; })
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.size? d.size : 3000 ; })
    .padding(1);
    
    
    
    //ajout une div a  body avec les style en question

var div = d3.select("body").append("div")
	.attr("classe", "treemap")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");
    
    

var root= treemap.nodes(g5k);
   
	
  var node = div.datum(root)
  	.selectAll(".node")
      .data(treemap.nodes)
      .enter().append("div")
      .attr("class", "node")
      .attr("id", function(d){var name="";
          var node = d;
          while(node.parent){
          if (name ==""){
            name= node.name;
            node=node.parent;
          }
          else{
            name= node.name+ "." + name ;
            node=node.parent;
          }
          }
          name= node.name +"." + name;
          return name;})
      .call(position)
      .style("background", function(d) {;return d.children ? color(d.name) : null; })
      .html(function(d) { return d.depth<3 ? "<div class= 'text"+ d.depth+"'>"+d.name +"</div>": null })
      .on("click", function(d){zoom(d.parent);});
      
      function zoom(d){
      console.log("parent: "+ d.parent.name);
}
      



  /*d3.selectAll("input").on("change", function change() {
    var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

    node
        .data(treemap.value(value).nodes)
      .transition()
        .duration(1500)
        .call(position);
  });*/


function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

