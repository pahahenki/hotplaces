var pad = 3, pas =1;
/*
 * function
 * parameters : URI, callback function
 * description : sends a GET http request, receives
 * a json structure and executes a callback function.
 */

  initialize(root);
  accumulate(root);
  layout(root);
  display(root);
  currentRoot= root;
  
 
  /*
   * function
   * parameters : node to inititialize
   * description : inititialize coordinates of given parameter
   */
  function initialize(root) {
    root.x = root.y = 0;
    root.dx = width;
    root.dy = height;
    root.depth = 0;
  }
 
 /*
  * function
  * parameters : node
  * description : Aggregate the values for internal nodes. This is normally done by the
  * treemap layout, but not here because of our custom implementation.
  */

  function accumulate(d) {
    nodes.push(d);
    return d.children
        ?  d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
        : 1;
  }
 
 
 /*
  * function
  * parameters : node
  * description : Compute the treemap layout recursively such that each group of siblings
  * uses the same size (1×1) rather than the dimensions of the parent cell.
  * This optimizes the layout for the current zoom state. Note that a wrapper
  * object is created for the parent node for each group of siblings so that
  * the parent’s dimensions are not discarded as we recurse. Since each group
  * of sibling was laid out in 1×1, we must rescale to fit using absolute
  * coordinates. This lets us use a viewport to zoom.
  */
  // 
  function layout(d) {
    if (d.children) {
    	console.log(pad);
    	var padding= pad-pas*(treeDepth(d)+1);
    	padding <0? padding= 0: padding=padding;
      treemap.nodes({children: d.children});
      d.children.forEach(function(c) {
      //treeDepth(c)< 3? console.log(c.name + " " + treeDepth(c) + " "+  treeDepth(c)%3): null;
        c.x = d.x + c.x * d.dx;
        c.y = d.y + c.y * d.dy;
        c.dx *= d.dx;
        c.dy *= d.dy;
        c.parent = d;
        });
        
      d.children.forEach(function(c) {

        c.x +=padding;
        c.y +=padding;
        c.dx -=(padding*2);
        c.dy -=(padding*2);
        
        layout(c);
      });
    }
  }
  


 
 /*
  * function
  * parameters : node
  * description : returns the depth of node given in parameters
  */
 function treeDepth(d) {
    var cpt=0;
    var tmp=d;
    while(tmp.parent) {
        cpt++;
        tmp = tmp.parent;
    }
    return cpt;
  }
  
  function common_ancestor(keywords) {
      //TODO find common ancestor
      return keywords;
      }
   /*
  * function
  * parameters : node
  * description : returns an array of the node's grandchildren
  */
  function grandChildren(d) {
    var gc = Array();
    for(var i in d.children) {
        gc = gc.concat(d.children[i].children);
    }
    return gc;

  }
 
  d3.selectAll("input").on("change", function change() {
    var value = this.value === "count"
        ? treemap.value(function(d) { return 2000 })
        : treemap.value(function(d) { return d.ressource });
       
       accumulate(currentRoot);
          layout(currentRoot);
          gOld.transition().duration(300).remove().each("end", function() {
                svg.style("shape-rendering", null);
                transitioning = false;
            });
        display(currentRoot);
        
  });
 
 /*
  * function
  * parameters : node 
  * description : displays a node with its components
  */
  function display(d) {

	  
    
    // create attribute depth
    var g1 = svg.insert("g", ".grandparent")
        .datum(d.children)
        .attr("class", "depth");
 
    // sets parameters for "g" tag
    var g = g1.selectAll("g")
        .data(d.children)
        .enter().append("g")
        .classed("children", true)
        .attr("name", function(d) { return d.depth ===3? d.parent.parent.name: (d.depth ===2? d.parent.name: (d.depth ===1? d.name: null)) ;})
        .attr("id", function(d){return getId(d);})
        .on("click", function(d){d.children? transition(d): null;})
        .on("contextmenu", function(d) {d.parent.parent? mouseDown(d) : null; })

        ;


    // sets parameters for parent "rect" tag
    g.append("rect")
        .attr("class", "parent")
        //.attr("stroke-width", "1")
        .call(rect)
        .append("title")
        .text(function(d) { return d.name; })

;


    var g2 =  g.selectAll("g")
        .data(function(d) { return d.children || [d]; })
        .enter().append("g")
        .classed("grandChild", true)
        .attr("name", function(d) { return d.depth ===3? d.parent.parent.name: (d.depth ===2? d.parent.name: (d.depth ===1? d.name: null)) ;})
        .attr("id", function(d){return getId(d);})
        .call(rect)
        .on("mouseover", function(d) {onHover(this.parentNode);})
        
;

    g2.append("rect").attr("class", "grandChildren")
       // .attr("stroke-width", "5")
        .call(rect)
;
        

    g2.selectAll("g")
        .data(function(d) { return d.children || [d]; })
        .enter()
        .append("rect")
        .attr("class",  "grandChild")
        //.attr("stroke-width", "1")
        .call(rect)
        .on("mouseout", function(d) {remove();})
        .on("mouseover", function(d) {contextualMenu(d);})
;

 
    // prints a text on a node
    g.append("text")
        .attr("dy", "1.75em")
        .attr("class", "textChildren")
        .text(function(d) { return d.name; })
        .call(text);
    
    // prints text on children nodes
    g.selectAll(".textChild")
        .data(function(d) { return d.children || [d]; })
        .enter().append("text")
        .attr("class", "textChild")
        //.text(function(d) { return x(d.dx)>30? d.name: null; })
        .text(function(d) { return d.name;})
        .attr("dy", ".75em")
        .attr("lengthAdjust", "spacingAndGlyphs")
        .call(textChild);

        gOld= g1;
 
    /*
     * function
     * parameters : node
     * description : change root by given parameter, used for zoomin/zoomout
     */

  
	function transition(d) {
		console.log(d + " " + treeDepth(d));
		treeDepth(d)>0 ? (pad = 2, pas = 0.5):(pad = 3, pas = 1);
	    layout(d);
        remove();
        unHighLight(undefined);
            if (transitioning || !d)
                return;
            transitioning = true;
            //layout(d);
            var g2 = display(d),
                    t1 = g1.transition().duration(300),
                    t2 = g2.transition().duration(300);

            // Update the domain only after entering new elements.
            x.domain([d.x, d.x + d.dx]);
            y.domain([d.y, d.y + d.dy]);

            // Enable anti-aliasing during the transition.
            // Desabled for  more fluent transitions
            svg.style("shape-rendering", null);

            // Draw child nodes on top of parent nodes.
            svg.selectAll(".depth").sort(function(a, b) {
                return a.depth - b.depth;
            });

            // Fade-in entering text.
            g2.selectAll("text").style("fill-opacity", 0);

            // Transition to the new view.
            t1.selectAll("text").call(text).style("fill-opacity", 0);
            t2.selectAll(".textChildren").call(text).style("fill-opacity", 1);
            t2.selectAll(".textChild").call(textChild).style("fill-opacity", 1);
            t1.selectAll("rect").call(rect);
            t2.selectAll("rect").call(rect);

            // Remove the old node when the transition is finished.
            t1.remove().each("end", function() {
                svg.style("shape-rendering", null);
                transitioning = false;
            });

            currentRoot= d;

            

        }
        
        //search function
        var search_field = document.getElementById('search_field');
        if(search_field.value.length !== 0)
            transition(root);
        
        /*
         * function
         * parameters : event
         * description : on mouse on diferents browsers
         */
        function mouseDown(e) {
            if (navigator.appName === 'Opera' && window.event.which === 3) {
                transition(d.parent.parent);
            }
            else if (navigator.appName === 'Microsoft Internet Explorer'
                    && event.button === 2) {
                transition(d.parent);
            }
            else if (navigator.appName === 'Netscape' && e.which === 3) {
                transition(d.parent);
            }
        }
        
        
        document.onmousedown=mouseDown;
        return g;
  }
 
  /*
   * function
   * description : adds attributes to "text" tags
   */
  function text(text) {
    text.attr("x", function(d) { return x(d.x+d.dx/2) ; })
        .attr("y", function(d) { return y(d.y) + 6; })
        .style("font-size",function(d) { return d.parent.children.length<20? "x-large": "medium";});
  }
  
   /*
    * function
    * description : adds attributes to children
    */
   function textChild(text) {
    text.attr("x", function(d) { return x(d.x) +6  ;})
        .attr("y", function(d) { return y(d.y) + 6; });
  }
 
  /*
   * function
   * descripton : adds attributes to the "rect" tags
   */
  function rect(rect) {
    rect.attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
        .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
        .style("fill", function(d){ return this.getAttribute('class')==='grandChild'?  "#109D00" : "#FFF" });
        //.style("fill", function(d) { return color(d.name); });
  }
  
  document.oncontextmenu=RightMouseDown;
  function RightMouseDown() { return false; } 
  

