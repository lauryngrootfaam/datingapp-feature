//feedback dat de server aan het opstarten is
console.log('Server is starting');

//constanten die de express functionaliteiten gebruikt
const express = require('express');
const app = express();
const path = require('path');

//constanten ejs
const ejs = require('ejs');

//express oprdrachten, routes
express()
    .use(express.static('static'))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .get('/', onhome)
    .get('/detail', detail)
    .get('/muziek', audio)
    .listen(8000, listening)
    


//functies
//feedback voor mij zelf dar hij daadwerkelijk "luistert", ik vind dit super fijn
function listening (){
    console.log('It is actually working..');
}

//een functie die hij uitvoert zodra er een request wordt opgevraagd door de gebruiker (route)
function onhome (req, res){
    // res.send('index.html')
    res.render('index', {data: {userQuery: req.params.userQuery}})
}

//functie audio wordt uitgevoerd zodra de gebruiker /muziek toevoegt aan de url
function audio (req, res){
    res.sendFile(path.join(__dirname + '/static/liedje.mp3'));
}

//object met data (array) over verschillende gebruikers 
let user = [
    { id: 1,
      name: "Lauryn",
      age: 20,
},

    { id: 2,
      name: "Jay",
      age: 24
}
]

//functie detailpagina
function detail (req, res){
    res.sendFile(path.join(__dirname + '/view/detail.ejs'));
    res.render('detail.ejs', {data: user});

}

//res.render('detail', {data: {user}})



