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

//functie die feedback geeft voor mijzelf dat de server daadwerkelijk "luistert", ik vind dit super fijn.
const listening = () => console.log('It is actually working..')

//een functie die hij uitvoert zodra er een request wordt opgevraagd door de gebruiker (route)
const onhome = (req, res) => res.render('index', {data: {userQuery: req.params.userQuery}})

//functies pagina's server on request
const inschrijven = (req, res) =>{
    res.sendFile(path.join(__dirname + '/view/inschrijven.ejs'));
    res.render('inschrijven.ejs', {data: users});
}

const inloggen = (req, res) => {
    res.sendFile(path.join(__dirname + '/view/inloggen.ejs'));
    res.render('inloggen.ejs', {data: users});

}

const hoofdpagina = (req, res) => {
    res.sendFile(path.join(__dirname + '/view/hoofdpagina.ejs'));
    res.render('hoofdpagina.ejs', {data: users});

}


//object met data (array) over verschillende gebruikers 
//deze data moet uiteindelijk uit de database komen
let users = [
    { username: "lauryngr_",
      firstname: "Lauryn",
      age: 20,
      description: "ik hou van ..."
},

    { username: "Jay24",
      firstname: "Jay",
      age: 24,
      description: "ik hou van voetbal..."
}
]


//functie die ervoor zorgt dat je data (users) toe kan voegen aan mijn array
let addUser = (req, res) =>{
 
let username = slug(req.body.username);

 users.push({
     username: username,
     firstname: req.body.firstname,
      age: req.body.age,
      description: req.body.description

 })
 res.redirect("/hoofdpagina");
}


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
    



// verwijderde code (niet relevant)


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



// es5 "normale" functies, ik heb ze omgeschreven in es6

//functies
//feedback voor mij zelf dar hij daadwerkelijk "luistert", ik vind dit super fijn
// function listening (){
//     console.log('It is actually working..');
// }