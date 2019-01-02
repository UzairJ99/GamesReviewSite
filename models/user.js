var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//user model
var UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    });
    
//adds methods to user
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);