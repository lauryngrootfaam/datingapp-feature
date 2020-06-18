// feedback dat de server aan het opstarten is
console.log('Server is starting')

// constanten die de express functionaliteiten gebruikt
const express = require('express')
const app = express()
const path = require('path')
const slug = require('slug')
const bodyParser = require('body-parser')
const session = require('express-session')

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
  .use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
  }))

  .set('view engine', 'ejs')
  .set('views', 'view')
  
  .get('/', onhome)
  .get('/inschrijven', inschrijven)
  .get('/hoofdpagina', hoofdpagina)
  .post('/hoofdpagina', addProfile)
  .get('/inloggen', inloggen)
  .get('/uitloggen', logout)
  

  .listen(8000, listening)

// object met data (array) over verschillende gebruikers
// deze data moet uiteindelijk uit de database komen
// const users = [
//   {
//     username: 'lauryngr_',
//     firstname: 'Lauryn',
//     age: 20,
//     description: 'ik hou van ...'
//   },

//   {
//     username: 'Jay24',
//     firstname: 'Jay',
//     age: 24,
//     description: 'ik hou van voetbal...'
//   }
// ]


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

function hoofdpagina (req, res, next) {
  
  db.collection('usersInfo').find().toArray(done)


  function done (err, users){
    if (err) {
          next (err)
          }  
  else if (!req.session.user) {
          res.status(401).send('i got this bitch fr')
        return
    
        } 
        else {
          console.log("dont give up, your this close")
          // res.render('hoofdpagina.ejs', {
          //        data: users

          //       })
                res.render('hoofdpagina.ejs', { data: req.body })
        }
      }
  
}

//Het pushen van de input van gebruikers naar database 
//account maken

//ik gebruik hier slug zodat ik username kan declaren buiten de insertOne functie en kan gebruiken voor session
  // const username = slug(req.body.username)
  //hulp gehad van Zoë


function addProfile (req, res, next) {
  //ik gebruik hier slug zodat ik username kan declaren buiten de insertOne functie en kan gebruiken voor session
  // const username = slug(req.body.username)
  db.collection('usersInfo').insertOne({
  username: req.body.username,
  firstname: req.body.firstname,
  age: req.body.age,
  description: req.body.description
  }, done)

  function done(err) {
    if (err) {
      next(err)
       } 
    else {
        res.render('hoofdpagina.ejs', { data: req.body })
    }
  }
}


//sessions
// bron: https://www.youtube.com/watch?v=hKYjSgyCd60

function logout(req, res, next) {
  
if(!req.session.viewCount) {
req.session.viewCount = 1;
}
else {
  req.session.viewCount += 1;
}
res.sendFile(path.join(__dirname + '/view/uitloggen.ejs'));
res.render('uitloggen', {viewCount : req.session.viewCount})
}

 //  else if (!req.session.user){
    //   res.status(401).send('Credentials required')
    // }

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
  res.render('inschrijven.ejs');

}

function inloggen (req, res){
  res.sendFile(path.join(__dirname + '/view/inloggen.ejs'));
  res.render('inloggen.ejs');

}
