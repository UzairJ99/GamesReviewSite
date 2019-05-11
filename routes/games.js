//declare dependant variables
var express = require("express");
//replaces app. with router.
var router = express.Router({mergeParams: true});

//mongoose models
var Game = require("../models/games"),
    Comment = require("../models/comments"),
    User = require("../models/user");
    
//call games page
router.get("/", function(req, res)
{
    //get games from database
    Game.find({}, function(err, allgames)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("games/index", {games: allgames});
        }
    });
});

//call page with form making a new post
router.get("/new", isLoggedIn, function(req,res)
{
    res.render("games/new");
});

//call the page to show more info about the game
router.get("/:id", function(req, res)
{
    Game.findById(req.params.id).populate("comments").exec(function(err, foundGame)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("games/show", {games: foundGame});
        }
    });
});

//form submits a post request for a new game
router.post("/", isLoggedIn, function(req, res)
{
   //get data from form and add to games database 
   var name = req.body.name;
   var image = req.body.image;
   var rating = req.body.rating;
   var desc = req.body.description;
   //add user information to game
   var author = {id: req.user._id, username: req.user.username};
   
   //make new game object from variables
   var newGame = {name: name, image: image, rating: rating, stars: 0, totalCount: 0, numOfStars: 0, description: desc, author: author};
   
   //add to the database
   Game.create(newGame, function(err, newgame)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            // console.log("Created new game: ");
            // console.log(newgame);
        }
    });
   //redirect to main games page
   res.redirect("/games");
});

//edit game route
router.get("/:id/edit", checkGameOwnership, function(req, res)
{
    //search for game using it's id
    Game.findById(req.params.id, function(err, foundGame)
    {
        //render edit page and pass in foundGame as game
        res.render("games/edit", {game: foundGame});
    });
});

//update game route
router.put("/:id", checkGameOwnership, function(req, res)
{
   //find and update game information
   Game.findByIdAndUpdate(req.params.id, req.body.game, function(err, updatedGame)
   {
       if(err)
       {
           res.redirect("/games");
       }
       else
       {
           req.flash("success", "Game successfully updated!");
           //redirect to show page
           res.redirect("/games/" + updatedGame._id);
       }
   });
});

//destroy route
router.delete("/:id", checkGameOwnership, function(req, res)
{
    Game.findByIdAndRemove(req.params.id, function(err)
    {
        if(err)
        {
            res.redirect("/games");
        }
        else
        {
            req.flash("success", "Game successfully deleted!");
            res.redirect("/games");
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
    req.flash("error", "Please login first");
    res.redirect("/login");
}

//function to authorize user
function checkGameOwnership(req, res, next)
{
    //is user logged in
    if(req.isAuthenticated())
    {
        //search for game using it's id
        Game.findById(req.params.id, function(err, foundGame)
        {
            if(err)
            {
                console.log(err);
                res.redirect("back");
            }
            else
            {
                //does user own the post
                if(foundGame.author.id.equals(req.user._id))
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