// feedback dat de server aan het opstarten is
console.log('Server is starting')

// constanten die de express functionaliteiten gebruikt
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongodb = require('mongodb')

// ejs requiren voor templating
require('ejs')

//database
//beveiligde info storen in .env file
require('dotenv').config()

//mongoDB url
const mongodbUrl = process.env.DB_URL

// express oprdrachten, routes
express()
  .use(express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
  }))

  .set('view engine', 'ejs')
  .set('views', 'view')
  
  .get('/', onhome)
  .get('/inschrijven', inschrijven)
  .get('/update', updatePagina)
  .get('/account', account)
  .get('/inloggen', inloggen)
  
  .post('/inschrijven', inschrijfData)
  .post('/update', addProfileUpdate)
  .post('/account', deleteAccount)
 
  .listen(8000, listening)

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

function inschrijven (req, res){
  res.render('inschrijven.ejs');
}

//in deze functie wordt de input van de gebruiker in de db aangemaakt
//Er wordt voor elke gebruiker een session gemaakt
// En met functie done wordt er gecontroleerd op foutmeldingen en redirect hij naar de juiste pagina

//hulp gehad van Roeland met de sessions (samen met Zoë)
function inschrijfData (req, res){
  req.session.user = {
        username: req.body.username,
        firstname: req.body.firstname,
        age: req.body.age,
        description: req.body.description
      }
    //insertOne heb ik van de CRUD handleiding van mongodb
      db.collection('usersInfo').insertOne(
      req.session.user, done)

     function done(err) {
            if (err) {
              next(err)
               } 
            else {
               res.redirect('update')
              }
          }
}

//Deze functie zorgt ervoor dat ik een specifiek gebruiker uit de database kan ophalen (sessions)
// en deze data kan aanroepen in mijn ejs templating files
//ook met deze async functie ben ik geholpen door Vincent en Roeland

async function updatePagina(req, res) {
	let currentUser = await db.collection('usersInfo').findOne({'_id': mongodb.ObjectID(req.session.user._id)});
	res.render('update', {data: currentUser});
}

//Bij deze functie zoekt hij ook alle gebruikers uit de db. Ik store het in een variabele zodat ik deze
// kan aan roepen in mijn ejs templating files
async function account (req, res){
  let currentUser = await db.collection('usersInfo').findOne({'_id': mongodb.ObjectID(req.session.user._id)}); 
  let allUsers = await db.collection('usersInfo').find().toArray() 
  res.render('account', {data: currentUser, users: allUsers});
}

//ik zoek hier naar een element (username) uit de huidige gebruiker (session), 
//die ik vervolgens met .updateOne kan updaten in mijn db
//update functie is vanuit de slides van de backend lessen

function addProfileUpdate(req, res) {
	db.collection('usersInfo').updateOne({
		'_id': mongodb.ObjectID(req.session.user._id)},
	{$set: 
			{username: req.body.username}
	}
	, check);

	function check(err, data) {
		if (err) {
			next(err);
		} else {
			res.redirect('account');
		}
	}
}

//Deze functie delete de huidige session/gebruiker uit de db.
//De functie wordt deleteAccount wordt nog gecheckt op foutmeldingen door functie done
//delete functie is vanuit de slides van de backend lessen
function deleteAccount(req, res) {
	db.collection('usersInfo').deleteOne({
		'_id': mongodb.ObjectID(req.session.user._id)
	}, done);

	function done(err, data) {
		if (err) {
			next(err);
		} else {
			res.redirect('/');
		}
	}
}

// research naar sessions
// bron: https://www.youtube.com/watch?v=hKYjSgyCd60

// function logout(req, res, next) {
  
// if(!req.session.viewCount) {
// req.session.viewCount = 1;
// }
// else {
//   req.session.viewCount += 1;
// }
// res.sendFile(path.join(__dirname + '/view/uitloggen.ejs'));
// res.render('uitloggen', {viewCount : req.session.viewCount})
// }

// functie die feedback geeft voor mijzelf dat de server daadwerkelijk "luistert", ik vind dit super fijn.
function listening() {  
  console.log('It is actually working..')
}

// een functie die hij uitvoert zodra er een request wordt opgevraagd door de gebruiker (route)
function onhome (req, res){
  res.render('index', {data: {userQuery: req.params.userQuery}})
}

function inloggen (req, res){
   res.render('inloggen.ejs');
}