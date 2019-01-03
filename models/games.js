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

module.exports = mongoose.model("Game", gameSchema);