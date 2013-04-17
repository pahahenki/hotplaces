

var margin = {top: 50, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    formatNumber = d3.format(",d"),
    color = d3.scale.category20c(),
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
    .style("shape-rendering", "crispEdges");
 
var grandparent = svg.append("g")
    .attr("class", "grandparent");
 

d3.json("g5kMock.json", function(root) {
  var nodes = [];
 
  initialize(root);
  accumulate(root);
  layout(root);
  display(root);
 
  function initialize(root) {
    root.x = root.y = 0;
    root.dx = width;
    root.dy = height;
    root.depth = 0;
  }
 
  // Aggregate the values for internal nodes. This is normally done by the
  // treemap layout, but not here because of our custom implementation.
  function accumulate(d) {
    nodes.push(d);
    return d.children
        ?  d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
        : 1;
  }
 
  // Compute the treemap layout recursively such that each group of siblings
  // uses the same size (1×1) rather than the dimensions of the parent cell.
  // This optimizes the layout for the current zoom state. Note that a wrapper
  // object is created for the parent node for each group of siblings so that
  // the parent’s dimensions are not discarded as we recurse. Since each group
  // of sibling was laid out in 1×1, we must rescale to fit using absolute
  // coordinates. This lets us use a viewport to zoom.
  function layout(d) {
    if (d.children) {
      treemap.nodes({children: d.children});
      d.children.forEach(function(c) {
        c.x = d.x + c.x * d.dx;
        c.y = d.y + c.y * d.dy;
        c.dx *= d.dx;
        c.dy *= d.dy;
        c.parent = d
        
        layout(c);
      });
    }
  }
 
  function display(d) {

 
    var g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");
 
    var g = g1.selectAll("g")
        .data(d.children)
        .enter().append("g")
        .classed("children", true)
        .attr("name", function(d) { return d.depth ===3? d.parent.parent.name: (d.depth ===2? d.parent.name: (d.depth ===1? d.name: null)) })
        .attr("id", function(d){return getId(d)})
        .on("click", function(d){d.children? transition(d): null})
        .on("contextmenu", function(d) {d.parent.parent? mouseDown(d) : null; })
        
        .on("mouseover", function(d) { onhover(d, this);});

 
    g.append("rect")
        .attr("class", "parent")
        .call(rect)
        
        .append("title")
        .text(function(d) { return d.name; });

    g.selectAll(".child")
        .data(function(d) { return d.children || [d]; })
        .enter().append("rect")
        .attr("class", "child")
        
        .call(rect)
        .on("mouseout", function(d) {remove();})
        .on("mouseover", function(d) {contextualMenu(d);});
 

 
    g.append("text")
        .attr("dy", ".75em")
        .text(function(d) { return d.name; })
        .call(text);
 
        function transition(d) {
        remove();
        unHightLight(undefined);
            if (transitioning || !d)
                return;
            transitioning = true;
           
            
            var g2 = display(d),
                    t1 = g1.transition().duration(300),
                    t2 = g2.transition().duration(300);

            // Update the domain only after entering new elements.
            x.domain([d.x, d.x + d.dx]);
            y.domain([d.y, d.y + d.dy]);

            // Enable anti-aliasing during the transition.
            // Desabled for  more fluent transitions
            //svg.style("shape-rendering", null);

            // Draw child nodes on top of parent nodes.
            svg.selectAll(".depth").sort(function(a, b) {
                return a.depth - b.depth;
            });

            // Fade-in entering text.
            g2.selectAll("text").style("fill-opacity", 0);

            // Transition to the new view.
            t1.selectAll("text").call(text).style("fill-opacity", 0);
            t2.selectAll("text").call(text).style("fill-opacity", 1);
            t1.selectAll("rect").call(rect);
            t2.selectAll("rect").call(rect);

            // Remove the old node when the transition is finished.
            t1.remove().each("end", function() {
                svg.style("shape-rendering", "crispEdges");
                transitioning = false;
            });
        }
    
        function mouseDown(d) {

            if (window.event.which === 3) {
                transition(d.parent.parent);
            }

        }
 
    return g;
  }
 
  function text(text) {
    text.attr("x", function(d) { return x(d.x) + 6; })
        .attr("y", function(d) { return y(d.y) + 6; });
  }
 
  function rect(rect) {
    rect.attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
        .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
        .style("fill", function(d) { return color(d.name); });
  }
 
  function name(d) {
    return d.parent
        ? name(d.parent) + "." + d.name
        : d.name;
  }
  
  
document.oncontextmenu=RightMouseDown;



function RightMouseDown() { return false; } 
  
});
