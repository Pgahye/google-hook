'use strict';
var mongoose = require('mongoose');
var TeamInfo = mongoose.model('TeamInfo');
var GameSchedule = mongoose.model('GameSchedule');

exports.processRequest = function(req, res) {
    if (req.body.queryResult.action == "schedule") {
        getTeamSchedule(req,res)
    }
    else if (req.body.queryResult.action == "tell")
    {
        getTeamInfo(req,res)
    }
};

function getTeamInfo(req,res){
    let parameters = req.body.queryResult.parameters;
    let game_occurence = parameters.game_occurence;
    let team = parameters.team;

   // console.log(GameSchedule); //{opponent:team}
    TeamInfo.find().then((data) => {
        console.log(data);
        if(data){
              return res.json({
                speech: 'Something went wrong!',
                displayText: `팀정보: ${data[0].description} 입니다.`,
                source: 'game schedule'
            });
        }else{
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'game schedule'
            });
        }
    })

}


function getTeamSchedule(req,res){
    let parameters = req.body.queryResult.parameters;
    let game_occurence = parameters.game_occurence;
    let team = parameters.team;

   // console.log(GameSchedule); //{opponent:team}
    GameSchedule.find().then((data) => {
        console.log(data);
        if(data){
               return res.json({
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      `스코어는 ${data[0].score} 입니다.`
                    ]
                  }
                }
              ]
            }) 
        }else{   
            return res.json({
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      "Text response from webhook error"
                    ]
                  }
                }
              ]
            })       
    }
    });
}
