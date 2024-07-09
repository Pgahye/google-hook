'use strict';
var mongoose = require('mongoose');
var TeamInfo = mongoose.model('TeamInfo');
var GameSchedule = mongoose.model('GameSchedule');

exports.processRequest = function(req, res) {
    if (req.body.queryResult.action == "schedule") {
        getTeamSchedule(req,res)
    }
    else if (req.body.queryResult.action == "tell.about")
    {
        getTeamInfo(req,res)
    }
};

function getTeamInfo(req,res)
{
      TeamInfo.find().then((data) => {
        console.log(data);
        if(data){
            return res.json(data);
        }else{
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'game schedule'
            });
        }
    }
}


function getTeamSchedule(req,res){
    let parameters = req.body.result.parameters;
    let game_occurence = parameters.game_occurence;
    let team = parameters.team;

   // console.log(GameSchedule); //{opponent:team}
    GameSchedule.find().then((data) => {
        console.log(data);
        if(data){
            return res.json(data);
        }else{
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'game schedule'
            });
        }
    })

}
