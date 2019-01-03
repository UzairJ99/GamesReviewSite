//declare dependant variables
var express = require("express");
//replaces app. with router.
var router = express.Router();
//mongoose models
var Game = require("../models/games"),
    Comment = require("../models/comments"),
    User = require("../models/user");

//routes for adding a new review
router.get("/games/:id/reviews/new", isLoggedIn, function(req, res)
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
router.post("/games/:id/reviews", isLoggedIn, function(req,res)
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