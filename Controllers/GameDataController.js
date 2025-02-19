'use strict';
var mongoose = require('mongoose');
var TeamInfo = mongoose.model('TeamInfo');
var GameSchedule = mongoose.model('GameSchedule');

exports.processRequest = function(req, res) {
    if (req.body.queryResult.action == "schedule") {
        getTeamSchedule(req,res)
    }
    else if (req.body.queryResult.action == "lab")
    {
        getTeamInfo(req,res)
    }
};

function getTeamInfo(req,res){
    let queryText = req.body.queryResult.parameters;

    TeamInfo.find({$and : [{preName : queryText.prName.name},{email : queryText.email}]}).then((data) => {
        if(data){
            console.log(data)
            if(data.length == 0){
                return res.json({
                    "followupEventInput": {
                        "name": "actions_intent_CANCEL",
                        "languageCode": "en-US",
                        "parameters": {

                        }
                    }
                })
            }else{
                return res.json({
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    `${data[0].name}연구실 인증이 완료되었습니다.`
                                ]
                            }
                        }
                    ]
                })
            }
        }else{
            return res.json({
                "followupEventInput": {
                    "name": "intentsEnd",
                    "languageCode": "en-US",
                    "parameters": {

                    }
                }
            })
        }
    });

}


function getTeamSchedule(req,res){
    let queryText = req.body.queryResult.parameters;

    GameSchedule.find({$and : [{date : queryText.any},{opponent : queryText.web_hook}]}).then((data) => {
        if(data){
               return res.json({
              "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      `${queryText.any} ${queryText.web_hook} 조횟수는 ${data[0].score} 입니다.`
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
