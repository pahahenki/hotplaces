var margin = {top: 50, right: 10, bottom: 10, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scale.category20c();

var treemap = d3.layout.treemap()
	.children(function(d, depth) { return depth===3 ? null : d.children; })
    .size([width, height])
    .sticky(true)
    .round(true)
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



var eletSelect ;

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
      .style("background", function(d) {;return d.parent ? color(d.parent.name) : null; })
      .html(function(d) { return d.depth<3 ? "<div class= 'text"+ d.depth+"'>"+d.name +"</div>": null })
      .on("click", function(d){zoom(d.parent);})
      .on("mouseout", function(d) { remove(); } )
      .on("mouseover", function(d) {
        var type = "";
        switch(d.depth) {
            case 0: 
                type = "Root : ";
                break;
            case 1 :
                type = "Site : ";
                break;
            case 2 :
                type = "Cluster : ";
                break;
            case 3 :
                type = "Node : ";
                break;
            case 4 :
                type = "VM : ";
                break;
        }
        if(d.depth >= 1)
            pop('<span class="nodeType">' + type + '</span><span class="nodeParent">' + d.parent.name + '.</span><span class="nodeName">' + d.name + "</span>");
        
        if(d.depth >1){
        var name="";
          var node = d.parent.parent;
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
         if(eletSelect != name && eletSelect != undefined){
          var papa = document.getElementById(name);
          var papa2 = document.getElementById(eletSelect);
          papa.style.border=" solid 1px #0000FF";
          papa2.style.border=" solid 1px #FFFFFF";
          eletSelect = name;
        }
        if(eletSelect === undefined){
          papa = document.getElementById(name);
          papa.style.border = " solid 1px #0000FF";
          eletSelect = name;
        }
      }
                });

      
      function zoom(d){
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

