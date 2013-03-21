TER Hotplaces
=================================
Projet de TER de M1IFI visant a faire une webapp afin de visualiser les serveurs et machines virtuelles d'un cloud

- auteur: Engilberge Swan
- equipe: Nadir Ouleha, Hedi Hedda, Swan Engilberge
- Encadrant: Fabien Hermenier


Notes d'installation 
--------------------------------------

Processus de build géré par [maven] (http://maven.apache.org). 

	$ mvn install

résout les dépendances, compile et package la webapp.
en sortie un fichier .war dans le répertoire 'target' servant a déployer la webapp sur le servlet


	$ mvn tomcat7:run

déploie le war dans un server tomcat embarqué par maven (plugin maven)
la webapp tourne sur http://localhost:8080.