  var memEletSelect ;
function contextualMenu(d){
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
        if(d.depth > 0)
            pop('<span class="nodeType">' + type + '</span><span class="nodeParent">' + d.parent.name + '.</span><span class="nodeName">' + d.name + "</span>");

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
	        
	        unHightLight(currentId);
	        hightLight(currentId, div);
	        
	        
          
          
          


      }
	

function unHightLight(currentId){
	        if(memEletSelect != currentId && memEletSelect != undefined && currentId !="g5k."){
		    
         	var oldElt = document.getElementById(memEletSelect);
         	var listEltOut= document.getElementsByName(memEletSelect.split(".")[memEletSelect.split(".").length-1]);
          for( var i = 1; i < listEltOut[0].childNodes.length-1; i++){
          		
          		var color =hexToRgb(listEltOut[0].childNodes[i].style.fill);
          		
          		
          		color.r +=  50;
          		color.g += 50;
          		color.b += 50;
	          listEltOut[0].childNodes[i].style.fill= "rgb("+color.r+","+color.g+","+color.b+")";
          }

          oldElt.style.border="";
          oldElt.style.backgroundColor="";
          memEletSelect = undefined;
          
        }
}

function hightLight(name, div){
		var currentElt = document.getElementById(name);
        var listEltIn= document.getElementsByName(div.getAttribute("name")); 
          
         if(memEletSelect != name && memEletSelect != undefined && name !="g5k."){
          
          for( var i = 1; i < listEltIn[0].childNodes.length-1; i++){
          		
          		var color =hexToRgb(listEltIn[0].childNodes[i].style.fill);
          		
          		
          		color.r -=  50;
          		color.g -= 50;
          		color.b -= 50;
	          listEltIn[0].childNodes[i].style.fill= "rgb("+color.r+","+color.g+","+color.b+")";
          }

         currentElt.childNodes[i].style.border=" solid 1px rgb(230,230,230)";
         currentElt.childNodes[i].style.backgroundColor="rgb(230,230,230)";

          
        }
        if(memEletSelect === undefined&& name !="g5k."){
          
         for( var i = 1; i < listEltIn[0].childNodes.length-1; i++){
          		
          		var color =hexToRgb(listEltIn[0].childNodes[i].style.fill);
          		
          		color.r -=  50;
          		color.g -= 50;
          		color.b -= 50;
	          listEltIn[0].childNodes[i].style.fill= "rgb("+color.r+","+color.g+","+color.b+")";
          }
          
          currentElt.style.border=" solid 1px rgb(230,230,230)";
          currentElt.style.backgroundColor="rgb(230,230,230)";
          memEletSelect = name;
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