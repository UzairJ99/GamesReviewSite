//declare dependant variables
var express = require("express");
//replaces app. with router.
var router = express.Router({mergeParams: true});
//mongoose models
var Game = require("../models/games"),
    Comment = require("../models/comments");

//routes for adding a new review
router.get("/new", isLoggedIn, function(req, res)
{
    Game.findById(req.params.id, function(err, game)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new", {games: game});
        }
    });
});

//Post route to add a new review
router.post("/", isLoggedIn, function(req,res)
{
    //get game with id
    Game.findById(req.params.id, function(err, foundGame)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/games");
        }
        else
        {
            //create new comment
            Comment.create(req.body.comment, function(err, newComment)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    //add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    //connect the comment to the game
                    foundGame.comments.push(newComment);
                    foundGame.save();
                    res.redirect("/games/" + foundGame._id);
                }
            });
        }
    });
});

//function to check if a user is logged in
function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;