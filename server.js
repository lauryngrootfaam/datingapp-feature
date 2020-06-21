// feedback dat de server aan het opstarten is
console.log('Server is starting')

// constanten die de express functionaliteiten gebruikt
const express = require('express')
const app = express()
const path = require('path')
// const slug = require('slug')
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
  res.sendFile(path.join(__dirname + '/view/inschrijven.ejs'));
  res.render('inschrijven.ejs');
}

function inschrijfData (req, res){
  req.session.user = {
        username: req.body.username,
        firstname: req.body.firstname,
        age: req.body.age,
        description: req.body.description
      }
    
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


async function updatePagina(req, res) { //async function because promise (user_id) was pending
	let currentUser = await db.collection('usersInfo').findOne({'_id': mongodb.ObjectID(req.session.user._id)}); //stored globally for re-use
	res.render('update', {data: currentUser});
}


// async function hoofdpagina (req, res){
//   let currentUser = await db.collection('usersInfo').findOne({'_id': mongodb.ObjectID(req.session.user._id)}); //stored globally for re-use
// 	res.render('hoofdpagina', {data: currentUser});
// }

async function account (req, res){
  let currentUser = await db.collection('usersInfo').findOne({'_id': mongodb.ObjectID(req.session.user._id)}); //stored globally for re-use
  let allUsers = await db.collection('usersInfo').find().toArray() 
  res.render('account', {data: currentUser, users: allUsers});
}

// async function hoofdpagina (res){
//   let allUsers = await db.collection('usersInfo').find().toArray()
// 	res.render('account', {users: allUsers});
// }



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

function deleteAccount(req, res) {
	db.collection('usersInfo').deleteOne({
		'_id': mongodb.ObjectID(req.session.user._id)
	}, check);

	function check(err, data) {
		if (err) {
			next(err);
		} else {
			res.redirect('/');
		}
	}
}


//sessions
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
  // res.send('index.html')
  res.render('index', {data: {userQuery: req.params.userQuery}})
}

// functies pagina's server on request
// function inschrijven (req, res){
//   res.sendFile(path.join(__dirname + '/view/inschrijven.ejs'));
//   res.render('inschrijven.ejs');

// }

function inloggen (req, res){
  res.sendFile(path.join(__dirname + '/view/inloggen.ejs'));
  res.render('inloggen.ejs');
}



