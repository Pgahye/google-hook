const express = require('express');
const  bodyParser   = require('body-parser');
const  http  = require('http');
const config = require('./config');
const  server  = express();
const mongoose  = require('mongoose');
const TeamInfo   = require('./Models/TeamInfo'); //created model loading here
const  GameSchedule = require('./Models/GameSchedule');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
var routes = require('./Routes/Routes'); //importing route
routes(server); //register the route
server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and listening on port" + process.env.PORT);
})

// app.get('/', function(req,res) {
//     res.send("<h1>hi friend!</h1>")
// })
//
// // 3000 포트로 서버 오픈
// app.listen(3000, function() {
//     console.log("start! express server on port 3000")
// })