var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamInfo = new Schema({
    name:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    preName:{
        type:String,
        required:false
    }
});
module.exports = mongoose.model('TeamInfo', TeamInfo);