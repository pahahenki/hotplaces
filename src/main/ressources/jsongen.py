
import os

class Node:

	def __init__(self, name):
		self.name = name
		self.children = []


def makeCluster(id, nb):
	cluster = Node(id)
	for i in range(nb):
		node = Node(id + "-" + str(i+1))
		for x in range(10):
			node.children.append(Node("VM" + str(x+1)))
		cluster.children.append(node)
	return cluster


def printNode(root):
	#print root.name + " "
	if root.children != []:
		for i in range(len(root.children)):
			printNode(root.children[i])


def jsonGen(root) :
	json = '{ "name" : "' + root.name + '" '
	if root.children != []:
		json += ', \n "children" : ['
		for i in range(len(root.children)):
			json += jsonGen(root.children[i]) + ', '
		json = json[:len(json)-2]
		json += '] \n'
	json += '}'
	return json





g5k = Node("g5k")


g5k.children.append(Node("bordeaux"))
g5k.children.append(Node("grenoble"))
g5k.children.append(Node("lille"))
g5k.children.append(Node("lyon"))
g5k.children.append(Node("nancy"))
g5k.children.append(Node("rennes"))
g5k.children.append(Node("sophia"))
g5k.children.append(Node("toulouse"))

bordeaux = g5k.children[0]
grenoble = g5k.children[1]
lille = g5k.children[2]
lyon = g5k.children[3]
nancy = g5k.children[4]
rennes = g5k.children[5]
sophia = g5k.children[6]
toulouse = g5k.children[7]


bordeaux.children.append(makeCluster("bordeplage", 51))
bordeaux.children.append(makeCluster("bordereau", 93))
bordeaux.children.append(makeCluster("borderline", 10))

grenoble.children.append(makeCluster("adonis", 10))
grenoble.children.append(makeCluster("edel", 72))
grenoble.children.append(makeCluster("genepi", 34))

lille.children.append(makeCluster("chimint", 3))
lille.children.append(makeCluster("chirloute", 8))
lille.children.append(makeCluster("chicon", 2))
lille.children.append(makeCluster("chiqchint", 5))

lyon.children.append(makeCluster("sagittaire", 79))
lyon.children.append(makeCluster("taurus", 16))
lyon.children.append(makeCluster("orion", 4))
lyon.children.append(makeCluster("hercule", 4))
lyon.children.append(makeCluster("capricorne", 56))

nancy.children.append(makeCluster("graphene", 144))
nancy.children.append(makeCluster("grifon", 92))

rennes.children.append(makeCluster("parapluie", 40))
rennes.children.append(makeCluster("parapide", 25))
rennes.children.append(makeCluster("paradent", 64))

sophia.children.append(makeCluster("azur", 49))
sophia.children.append(makeCluster("helios", 56))
sophia.children.append(makeCluster("sol", 50))

toulouse.children.append(makeCluster("chocolatine", 51))
toulouse.children.append(makeCluster("chocapique", 93))


mock = open("g5kMock.json", "w")
mock.write(jsonGen(g5k))
mock.close()



