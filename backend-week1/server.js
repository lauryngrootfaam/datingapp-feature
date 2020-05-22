console.log('Server is starting');

const express = require('express');
const app = express();


express()
    .use(express.static('static'))
    .listen(8000, listening)


app.use(function (req, res, next) {
    res.status(404).send("De webserver failed")
})

function listening (){
    console.log('It is actually working..');
}

//code van de resource die ik gebruikt heb:

// var server = app.listen(8000, listening);
// app.use(express.static('static'));