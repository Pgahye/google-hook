'use strict';
var mongoose = require('mongoose');
var TeamInfo = mongoose.model('TeamInfo');
var GameSchedule = mongoose.model('GameSchedule');

exports.processRequest = function(req, res) {
    if (req.body.result.action == "schedule") {
        getTeamSchedule(req,res)
    }
    else if (req.body.result.action == "tell.about")
    {
        getTeamInfo(req,res)
    }
};

function getTeamInfo(req,res)
{
    let teamToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.team ? req.body.result.parameters.team : 'Unknown';
    TeamInfo.findOne({name:teamToSearch},function(err,teamExists)
    {
        if (err)
        {
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'team info'
            });
        }
        if (teamExists)
        {
            return res.json({
                speech: teamExists.description,
                displayText: teamExists.description,
                source: 'team info'
            });
        }
        else {
            return res.json({
                speech: 'Currently I am not having information about this team',
                displayText: 'Currently I am not having information about this team',
                source: 'team info'
            });
        }
    });
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