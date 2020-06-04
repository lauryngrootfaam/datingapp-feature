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

- body-parser : extract the entire body portion of an incoming request stream and exposes it on req.body
- ejs: Ultimately, EJS is a tool to generate HTML markup with plain Javascript.
- express: Express.js, or simply Express, is a web application framework for Node.js. It o.a. has helped me to setup a simple server.
- mongodb: database connection


De volgende packages zullen gebruik makelijker/beter maken, maar zijn niet per se nodig (**dev. dependencies**)

- nodemon : Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
- ESlint : ESLint is an open source JavaScript linting utility originally created by Nicholas C. Zakas in June 2013. Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn't adhere to certain style guidelines.

# Bronnen
* What does body-parser do with express? (2016, 11 juli). Geraadpleegd van https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express#:%7E:text=body%2Dparser%20extract%20the%20entire,submitted%20using%20HTTP%20POST%20request.
* What is EJS and why do I need it? (2017, 12 oktober). Geraadpleegd van https://blog.karmacomputing.co.uk/what-is-ejs-and-why-do-i-need-it/
* Wikipedia contributors. (2020b, 23 mei). Express.js - Wikipedia. Geraadpleegd van https://en.wikipedia.org/wiki/Express.js#:%7E:text=Express.,standard%20server%20framework%20for%20Node.
* Nodemon. (z.d.). Geraadpleegd van https://nodemon.io/
* About. (z.d.). Geraadpleegd van https://eslint.org/docs/about/#:%7E:text=ESLint%20is%20an%20open%20source,adhere%20to%20certain%20style%20guidelines.
