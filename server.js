//feedback dat de server aan het opstarten is
console.log('Server is starting');

//constanten die de express functionaliteiten gebruikt
const express = require('express');
const app = express();
const path = require('path')
const slug = require('slug')
const bodyParser = require('body-parser')

//constanten ejs
const ejs = require('ejs');

//express oprdrachten, routes
express()
    .use(express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .get('/', onhome)
    .get('/inschrijven', inschrijven)
    .get('/hoofdpagina', hoofdpagina)
    .post('/hoofdpagina', addUser)
    // .delete('/:id', remove)
    .get('/inloggen', inloggen)
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

//object met data (array) over verschillende gebruikers 
let users = [
    { username: "lauryngr_",
      firstname: "Lauryn",
      age: 20,
      description: "ik hou van ..."
},

    { username: "Jay24",
      firstname: "Jay",
      age: 24,
      description: "ik hou van kip..."
}
]

//functie inschrijvenpagina
function inschrijven (req, res){
    res.sendFile(path.join(__dirname + '/view/inschrijven.ejs'));
    res.render('inschrijven.ejs', {data: users});

}

function inloggen (req, res){
    res.sendFile(path.join(__dirname + '/view/inloggen.ejs'));
    res.render('inloggen.ejs', {data: users});

}

function hoofdpagina (req, res){
    res.sendFile(path.join(__dirname + '/view/hoofdpagina.ejs'));
    res.render('hoofdpagina.ejs', {data: users});

}


//functie die ervoor zorgt dat je data (users) toe kan voegen aan mijn array
function addUser(req, res){

    
    let username = slug(req.body.username);

 users.push({
     username: username,
     firstname: req.body.firstname,
      age: req.body.age,
      description: req.body.description

 })
 res.redirect("/hoofdpagina");
}


// function remove(req, res) {
//     let id = req.params.id
   
//     users = users.filter(function (users) {
//       return users.id !== id
     
//     })
  
//     res.json({status: 'ok'})
//   }


// //functie audio wordt uitgevoerd zodra de gebruiker /muziek toevoegt aan de url
// function audio (req, res){
//     res.sendFile(path.join(__dirname + '/static/liedje.mp3'));
// }