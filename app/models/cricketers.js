// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const battingSchema = mongoose.Schema({
    "50": String,
    "100": String,
    "St": String,
    "Ct": String,
    "6s": String,
    "4s": String,
    "SR": String,
    "BF": String,
    "Ave": String,
    "HS": String,
    "Runs": String,
    "NO": String,
    "Inns": String,
    "Mat": String
})

const bowlingSchema = mongoose.Schema({
    "10": String,
    "5w": String,
    "4w": String,
    "SR": String,
    "Econ": String,
    "Ave": String,
    "BBM": String,
    "BBI": String,
    "Wkts": String,
    "Runs": String,
    "Balls": String,
    "Inns": String,
    "Mat": String
})

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Players', new Schema({
    "pid": String,
    "profile": String,
    "imageURL": String,
    "battingStyle": String,
    "bowlingStyle": String,
    "majorTeams": String,
    "currentAge": String,
    "born": String,
    "fullName": String,
    "name": String,
    "country": String,
    "playingRole": String,
    "data": {
        "bowling": {
            "listA": bowlingSchema,
            "firstClass": bowlingSchema,
            "T20Is": bowlingSchema,
            "ODIs": bowlingSchema,
            "tests": bowlingSchema
        },
        "batting": {
            "listA": battingSchema,
            "firstClass": battingSchema,
            "T20Is": battingSchema,
            "ODIs": battingSchema,
            "tests": battingSchema
        }
    }
}));