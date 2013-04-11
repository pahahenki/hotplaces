  
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
        if(d.depth >= 3)
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
			if(d.depth >1){
			
	        var name= getId(d.parent.parent);
	        hightLight(d, name, div);
	        unHightLight(d, name);
          
          
          


      }
	
}
function unHightLight(d, name){
	        
	        if(eletSelect != name && eletSelect != undefined && name !="g5k."){
         	var oldElt = document.getElementById(eletSelect);
         	var listEltOut= document.getElementsByName(eletSelect.split(".")[1]);
          
          for( var i = 0; i < listEltOut.length; i++){
          		var color =listEltOut[i].style.backgroundColor.slice(4,17).split(", ");

          		
          		var r =  parseInt(color[0])+50;
          		var g = parseInt(color[1])+50;
          		var b = parseInt(color[2])+50;
          		//console.log("color + 20 : " + r);
	          listEltOut[i].style.backgroundColor= "rgb("+r+","+g+","+b+")";
          }

          oldElt.style.border="";
          oldElt.style.backgroundColor="";
          eletSelect = name;
        }
	
}

function hightLight(d, name, div){
		var currentElt = document.getElementById(name);
          var listEltIn= document.getElementsByName(div.getAttribute("name")); 
          
         if(eletSelect != name && eletSelect != undefined && name !="g5k."){

          
          //console.log(eletSelect + "   " + eltOut);
          for( var i = 0; i < listEltIn.length; i++){
          		var color =listEltIn[i].style.backgroundColor.slice(4,17).split(", ");
          		//console.log("avant :" +color);
          		//console.log("b: "+color[2]);
          		
          		var r =  parseInt(color[0])-50;
          		var g = parseInt(color[1])-50;
          		var b = parseInt(color[2])-50;
          		//console.log("color + 20 : " + r);
	          listEltIn[i].style.backgroundColor= "rgb("+r+","+g+","+b+")";
	          //console.log("apres: "+listNode[i].style.backgroundColor.slice(4,15).split(", "));
          }

         currentElt.style.border=" solid 1px rgb(230,230,230)";
          currentElt.style.backgroundColor="rgb(230,230,230)";

          
        }
        if(eletSelect === undefined&& name !="g5k."){
          
          
          //console.log(eletSelect + "   " + eltOut);
          for( var i = 0; i < listEltIn.length; i++){
          		var color =listEltIn[i].style.backgroundColor.slice(4,17).split(", ");
          		
          		var r =  parseInt(color[0])-50;
          		var g = parseInt(color[1])-50;
          		var b = parseInt(color[2])-50;
	          listEltIn[i].style.backgroundColor= "rgb("+r+","+g+","+b+")";
          }
          
         currentElt.style.border=" solid 1px rgb(230,230,230)";
          currentElt.style.backgroundColor="rgb(230,230,230)";
          eletSelect = name;
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

//console.log("" + x + "," + y);

}
function remove() {
    document.getElementById("bulle").innerHTML = '';
}