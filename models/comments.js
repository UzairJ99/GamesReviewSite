//require mongo
var mongoose = require("mongoose");

//mongoose schema for a comment
var commentSchema = new mongoose.Schema(
    {
        text: String,
        author: 
        {
            id: 
            {
                //get object id of model type User
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
        stars: Number
    });
 
module.exports = mongoose.model("Comment", commentSchema);