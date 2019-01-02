var mongoose = require("mongoose");
//schema setup
var gameSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        rating: String,
        stars: Number,
        description: String,
        comments: 
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    });

//create model using above schema   
var Game = mongoose.model("Game", gameSchema);

module.exports = mongoose.model("Game", gameSchema);