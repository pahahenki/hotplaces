  var memEletSelect ;
function contextualMenu(d){
    var tmp = d;
    var str = "";
    var names = Array();
    var depth = 0;

    while(tmp.parent != null) {
        names.push('<span class="nodeLvl' + depth + '">' + tmp.name + '</span>');
        tmp = tmp.parent;
        depth++;
    }
    names.reverse();
    str = names.join(".");
    pop(str);
}

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

function getId(d){
	
        var name="";
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
          return name= node.name +"." + name;

}
 
function onhover(d, div){
			var dcolor= d;
							
	        var currentId= getId(dcolor);
	        
	        unHightLight(div);
	        hightLight(div);
	        

      }
	

function unHightLight(div){
	        if(memEletSelect != div && memEletSelect != undefined){
		    
         	var listChildNode = memEletSelect? memEletSelect.childNodes : null;
         	if(listChildNode != null){
          for( var i = 1; i < (listChildNode.length-1)/2; i++){
          		
          	//in safari and chrome
	          var color =listChildNode[i].style.fill;
          		if(color[0] === "#"){
          			color = hexToRgb(color);
          			color.r +=  50;
          			color.g += 50;
          			color.b += 50;
          			listChildNode[i].style.fill= "rgb("+color.r+","+color.g+","+color.b+")";
	          }
	          //in opera and firefox
	          	if(color[0]==="r"){
		          	color=color.split(",");
		          	var r = parseInt(color[0].slice(4))+50;
		          	var g= parseInt(color[1]) +50;
		          	var b = parseInt(color[2].slice(0,color[2].length-1)) +50;
		          	listChildNode[i].style.fill= "rgb("+r+","+g+","+b+")";

		          	
	          	}
          }
          memEletSelect.style.border="";
          memEletSelect.style.backgroundColor="";
          }

         
          memEletSelect = undefined;
          

          
        }
}

function hightLight( div){
              
         if(memEletSelect != div && memEletSelect != undefined && div.getAttribute("id") !="g5k."){
          
          for( var i = 1; i < div.childNodes.length-1; i++){
          		
	          //in safari and chrome
	          var color =div.childNodes[i].style.fill;
          		if(color[0] === "#"){
          			color = hexToRgb(color);
          			color.r -=  50;
          			color.g -= 50;
          			color.b -= 50;
          			div.childNodes[i].style.fill= "rgb("+color.r+","+color.g+","+color.b+")";
	          }
	          //in opera and firefox
	          	if(color[0]==="r"){
		          	color=color.split(",");
		          	var r = parseInt(color[0].slice(4))-50;
		          	var g= parseInt(color[1]) -50;
		          	var b = parseInt(color[2].slice(0,color[2].length-1)) -50;
		          	div.childNodes[i].style.fill= "rgb("+r+","+g+","+b+")";

		          	
	          	}
          }

         div.childNodes[i].style.border=" solid 1px rgb(230,230,230)";
         div.childNodes[i].style.backgroundColor="rgb(230,230,230)";

          
        }
        
        if(memEletSelect === undefined&& div.getAttribute("id") !="g5k."){
          
         for( var i = 1; i < (div.childNodes.length-1)/2; i++){
          		//in safari and chrome
          	var color =div.childNodes[i].style.fill;
          		if(color[0] === "#"){
          		color = hexToRgb(color);
          		color.r -=  50;
          		color.g -= 50;
          		color.b -= 50;
	          div.childNodes[i].style.fill= "rgb("+color.r+","+color.g+","+color.b+")";
	          }
	          //in opera and firefox
	          	if(color[0]==="r"){
		          	color=color.split(",");
		          	var r = parseInt(color[0].slice(4))-50;
		          	var g= parseInt(color[1]) -50;
		          	var b = parseInt(color[2].slice(0,color[2].length-1)) -50;
		          	div.childNodes[i].style.fill= "rgb("+r+","+g+","+b+")";

		          	
	          	}
          }
          
          div.style.border=" solid 1px rgb(230,230,230)";
          div.style.backgroundColor="rgb(230,230,230)";
          memEletSelect = div;
        }
}


decal_x = 25;
decal_y = -15;

document.onmousemove = follow_mouse;
var contenu;
function pop(contenu) {
    document.getElementById("bulle").innerHTML = contenu;

}
function follow_mouse(e) {

    var x = e.pageX;
    var y = e.pageY;
    var d = document.getElementById("bulle");
    //d.position = "relative";
    //d.style.top = y + decal_y;
    //d.style.left = x + decal_x;



}
function remove() {
    document.getElementById("bulle").innerHTML = '';
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function textResize(elt, d) {
            
            var textWidth = elt.getComputedTextLength();
            var arrayBro = elt.parentNode.childNodes;
            var len = arrayBro.length;
            var i = len / 2;

            if (arrayBro[i].firstChild===null || elt.firstChild === null)
                return null;

            while (arrayBro[i].firstChild.nodeValue !== elt.firstChild.nodeValue) {
                i++;
            }


            var irect = i - len / 2;
            var rectWidth = parseInt(elt.parentNode.childNodes[irect].getAttribute('width'));
            
            console.log(d.name);
            console.log(textWidth);
            console.log(rectWidth);
          
    return textWidth < rectWidth ? null : rectWidth *2;
        }