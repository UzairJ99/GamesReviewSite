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
                    req.flash("error", "Something went wrong");
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
                    req.flash("success", "Successfully added a review!");
                    res.redirect("/games/" + foundGame._id);
                }
            });
        }
    });
});

//delete review
router.delete("/:comment_id", checkReviewOwnership, function(req, res)
{
    //find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err)
    {
        if(err)
        {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        }
        else
        {
            //redirect to the game
            req.flash("success", "Successfully deleted the review!");
            res.redirect("/games/" + req.params.id);
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

//function to authorize user
function checkReviewOwnership(req, res, next)
{
    //is user logged in
    if(req.isAuthenticated())
    {
        //search for game using it's id
        Comment.findById(req.params.comment_id, function(err, foundComment)
        {
            if(err)
            {
                console.log(err);
                res.redirect("back");
            }
            else
            {
                //does user own the review
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You do not have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

module.exports = router;