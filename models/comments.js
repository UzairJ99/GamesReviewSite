//require mongo
var mongoose = require("mongoose");

//mongoose schema for a comment
var commentSchema = new mongoose.Schema(
    {
        text: String,
        author: String
    });
 
module.exports = mongoose.model("Comment", commentSchema);