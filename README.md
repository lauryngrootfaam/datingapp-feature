# daLove datingapp-feature

## daLove
Dit is een project voor een datingapp, waarbij de feature registreren centraal staat. daLove is een dating app voor studenten die opzoek zijn naar een serieuze relatie. Het is in deze generatie vaak lastig om andere studenten te vinden die opzoek zijn naar een serieuze (lange) relatie. Veel datingplatformen die studenten gebruiken, zijn vaak gericht op scharrels en niet serieuze-relaties. daLove moet dus een platform worden waar studenten wél die serieuze relatie kunnen vinden.


## Jobstory
_Wanneer ik een account aanmaak, wil ik zeker weten dat mijn persoonlijke gegevens op een betrouwbare en veilige manier worden verwerkt, zodat ik mij geen zorgen hoef te maken over mogelijk schending van mijn privacy._

## Features

* Een account kunnen aanmaken
* Een account kunnen aanpassen
* Een account kunnen verwijderen
* Kunnen inloggen met een bestaand account

## Install guide
### Stap 1: Clone locally
Clone het project locallt, door in de terminal de code git clone te gebruiken:

`git clone https://github.com/lauryngrootfaam/datingapp-feature.git`

### Stap 2: Go to the right directory
Ga naar de juiste directory door in de terminal deze code te gebruiken:

`cd dating-app-feature`

Let wel op dat je in de juiste map zit (anders pas de directory aan door cd /(directory))

### Stap 3: Installeer alle (dependencie) packages
Dit doe je door de code npm install te gebruiken

`npm install `

### Stap 4: Start het project op 
Je kunt de server opstarten met de code :
` node server.js`

of met de standaard code:

`npm start`

of met nodemon, zodat de server blijft draaien. Dit zou ik alleen gebruiken als je daadwerkelijk code aanpast

`npm install -g nodemon`
`nodemon server.js`



## De gebruikte (NPM) Packages
Ik heb de volgende packages gebruikt die je nodig zult hebben als je mijn project locally goed wilt kunnen draaien (**dependencies**):

- body-parser
- ejs
- express
- mongodb
- pug
- slug

De volgende packages zullen gebruik makelijker/beter maken, maar zijn niet per se nodig (**dev. dependencies**)

- nodemon
- ESlint

