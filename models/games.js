var mongoose = require("mongoose");
//schema setup
var gameSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        rating: String,
        stars: Number,
        numOfReviews: Number,
        totalCount: Number,
        description: String,
        comments: 
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
        author:
        {
            username: String,
            id: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    });

module.exports = mongoose.model("Game", gameSchema);