// feedback dat de server aan het opstarten is
console.log('Server is starting')

// constanten die de express functionaliteiten gebruikt
const express = require('express')
const app = express()
const path = require('path')
const slug = require('slug')
const bodyParser = require('body-parser')

// constanten ejs
const ejs = require('ejs')

//database
//beveiligde info storen in .env file
require('dotenv').config()
const mongodb = require('mongodb')
//mongoDB url
const mongodbUrl = process.env.DB_URL

// express oprdrachten, routes
express()
  .use(express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))

  .set('view engine', 'ejs')
  .set('views', 'view')
  
  .get('/', onhome)
  .get('/inschrijven', inschrijven)
  .get('/hoofdpagina', hoofdpagina)

  .post('/hoofdpagina', insertUserdata)


  .get('/inloggen', inloggen)
  .listen(8000, listening)

// object met data (array) over verschillende gebruikers
// deze data moet uiteindelijk uit de database komen
const users = [
  {
    username: 'lauryngr_',
    firstname: 'Lauryn',
    age: 20,
    description: 'ik hou van ...'
  },

  {
    username: 'Jay24',
    firstname: 'Jay',
    age: 24,
    description: 'ik hou van voetbal...'
  }
]


//connecten met de database
let db;
mongodb.MongoClient.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    throw err;
   
  } else {
    console.log('Database is connected');
  }
  db = client.db(process.env.DB_NAME);
});


//Het zoeken van een db collectie en een array daarin
//Het pushen van de input van gebruikers naar database 
function addUser(req, res){
  const username = slug(req.body.username)

  users.push({
    username: username,
    firstname: req.body.firstname,
    age: req.body.age,
    description: req.body.description

  })
  console.log(users)
  res.redirect('/hoofdpagina')
}



function insertUserdata () {
db.collection('usersinfo').insertOne({
  
  username: req.body.username,
 firstname: req.body.firstname,
   age: req.body.age,
   description: req.body.description
  
}, done)
}




// functie die feedback geeft voor mijzelf dat de server daadwerkelijk "luistert", ik vind dit super fijn.
function listening() {  
  console.log('It is actually working..')
}

// een functie die hij uitvoert zodra er een request wordt opgevraagd door de gebruiker (route)
function onhome (req, res){
  // res.send('index.html')
  res.render('index', {data: {userQuery: req.params.userQuery}})
}


// functies pagina's server on request
function inschrijven (req, res){
  res.sendFile(path.join(__dirname + '/view/inschrijven.ejs'));
  res.render('inschrijven.ejs', {data: users});

}

function inloggen (req, res){
  res.sendFile(path.join(__dirname + '/view/inloggen.ejs'));
  res.render('inloggen.ejs', {data: users});

}

function hoofdpagina(req, res){
  res.sendFile(path.join(__dirname + '/view/hoofdpagina.ejs'))
  res.render('hoofdpagina.ejs', { data: users })
}
