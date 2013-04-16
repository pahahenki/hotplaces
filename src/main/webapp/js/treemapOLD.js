var margin = {top: 50, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
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
	.attr("class", "treemap")
	.attr("id", "treemap")
	.attr("onmouseout", "unHightLight(undefined);")
	.attr("onmouseover", "")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px")
    


    
    

var root= treemap.nodes(g5k);





  var node = div.datum(root)
  	.selectAll(".node")
      .data(treemap.nodes)
      .enter().append("div")
      .attr("name", function(d) { return d.depth ===3? d.parent.parent.name: (d.depth ===2? d.parent.name: (d.depth ===1? d.name: null)) })
      .attr("class", function(d){ return d.depth ===3 ? "children": (d.depth ===2? "node" : "parent")})
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
      .style("background", function(d) {;return (d.parent && d.depth===3) ? color(d.parent.name) : null; })
      //.html(function(d) { return d.depth<3 ? "<span class= 'text"+ d.depth+"'>"+d.name +"</span>": null })
      .text(function(d) { return d.depth===3 ? (d.name ===d.parent.name+"-"+d.parent.children.length? d.parent.name:null): null })
      .on("click", function(d){return this.firstElementChild ? console.log(d.name): console.log(d.name);})
      .on("mouseout", function(d) {remove(); })
      .on("mouseover", function(d) {contextualMenu(d);d.depth>0?onhover(d, this): null;});

      
      function zoom(d){
}

function cutString(d){
	if (d.depth>2 ){
		var name = d.parent.name;
		//var idDivD = getId(d);
		var idDivParent = getId(d.parent);
		var sizeString =name.length;
		//var divD = document.getElementById(idDivD);
		var divParent = document.getElementById(idDivParent);
		//var nbDInParent =
		var parentWidth= divParent.style.width;
		var totalWidth = document.getElementById(idDivParent +"-" + d.parent.children.length).style.width
		console.log(totalWidth + " " + parentWidth);
		}
		

	}
