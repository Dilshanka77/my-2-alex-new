const { Schema, model} = require('mongoose');

let countn = new Schema({
    UserId : {
        type: String,
        required: true
    },
    Count : {
        type: String,
        required: true
    },
   // VoiceId : {
        //type: String,
       // required: true
   // }, 
   
});
module.exports = model('countn ', countn );