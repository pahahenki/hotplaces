/**
 * A simili Grid'5000 infrastructure that is
 * compatible with the default json backend for D3.js
 */
var g5k = {};
g5k.children = [];
g5k.name= "g5k";

g5k.children[0] = makeSite("bordeaux");
g5k.children[1] = makeSite("grenoble");
g5k.children[2] = makeSite("lille");
g5k.children[3] = makeSite("lyon");
g5k.children[4] = makeSite("nancy");
g5k.children[5] = makeSite("rennes");
g5k.children[6] = makeSite("sophia");
g5k.children[7] = makeSite("toulouse");

var bordeaux = g5k.children[0];
var grenoble = g5k.children[1];
var lille = g5k.children[2];
var lyon = g5k.children[3];
var nancy = g5k.children[4];
var rennes = g5k.children[5];
var sophia = g5k.children[6];
var toulouse = g5k.children[7];

bordeaux.children[0] = makeCluster("bordeplage", 51);
bordeaux.children[1] = makeCluster("bordereau", 93);
bordeaux.children[2] = makeCluster("borderline", 10);

grenoble.children[0] = makeCluster("adonis", 10);
grenoble.children[1] = makeCluster("edel", 72);
grenoble.children[2] = makeCluster("genepi", 34);

lille.children[0] = makeCluster("chimint", 20);
lille.children[1] = makeCluster("chirloute", 8);
lille.children[2] = makeCluster("chicon", 26);
lille.children[3] = makeCluster("chiqchint", 46);

lyon.children[0] = makeCluster("sagittaire", 79);
lyon.children[1] = makeCluster("taurus", 16);
lyon.children[2] = makeCluster("orion", 4);
lyon.children[3] = makeCluster("hercule", 4);
lyon.children[4] = makeCluster("capricorne", 56);

nancy.children[0] = makeCluster("graphene", 144);
nancy.children[1] = makeCluster("grifon", 92);

rennes.children[0] = makeCluster("parapluie", 40);
rennes.children[1] = makeCluster("parapide", 25);
rennes.children[2] = makeCluster("paradent", 64);

sophia.children[0] = makeCluster("azur", 49);
sophia.children[1] = makeCluster("helios", 56);
sophia.children[2] = makeCluster("sol", 50);


//console.log(g5k)

function makeSite(id) {
	var s = new Object();
	s.name = id;
	s.children = [];
	return s;
}

function makeCluster(id, nb) {
	var c = new Object();
	c.name = id;	
	c.children=[]
	for (var i = 1; i <= nb; i++) {
		var n = new Object();
		n.name = id + "-" + i;						
		n.children = [];
		for (var x = 1; x < 10; x++) {
			var vm = new Object();
			vm.name = "VM" + x;
			vm.children = [];
			n.children[x - 1] = vm; 
		}
		c.children[i - 1] = n;
	}
	return c;
}
