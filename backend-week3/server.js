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
    .get('/detail', detail)
    .post('/detail', addUser)
    // .delete('/:id', remove)
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
let users = [
    { id: "lauryngr_",
      firstname: "Lauryn",
      age: 20,
      description: "ik hou van ..."
},

    { id: "Jay24",
      firstname: "Jay",
      age: 24,
      description: "ik hou van kip..."
}
]

//functie detailpagina
function detail (req, res){
    res.sendFile(path.join(__dirname + '/view/detail.ejs'));
    res.render('detail.ejs', {data: users});

}


//functie die ervoor zorgt dat je data (users) toe kan voegen aan mijn array
function addUser(req, res){

    
    let id = slug(req.body.id);

 users.push({
     id: id,
     firstname: req.body.firstname,
      age: req.body.age,
      description: req.body.description

 })
 res.redirect("/detail");
}


// function remove(req, res) {
//     let id = req.params.id
   
//     users = users.filter(function (users) {
//       return users.id !== id
     
//     })
  
//     res.json({status: 'ok'})
//   }
