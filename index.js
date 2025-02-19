'use strict';
var express  = require('express'),
    bodyParser   = require('body-parser'),
    http         = require('http'),
    config       = require('./config'),
    server       = express(),
    mongoose     = require('mongoose'),
    TeamInfo     = require('./Models/TeamInfo'), //created model loading here
    GameSchedule = require('./Models/GameSchedule');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://ghpark:bbfuYEsvgyf7bK3M@cluster0.i1mw0ib.mongodb.net?retryWrites=true&w=majority&appName=Cluster0', {dbName : "nba"}); //디비 연결
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
var routes = require('./Routes/Routes'); //importing route

routes(server); //register the route
server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and listening on port" +process.env.PORT || 8000);
})