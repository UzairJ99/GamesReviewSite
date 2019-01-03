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
router.post("/", function(req, res)
{
   //get data from form and add to games database 
   var name = req.body.name;
   var image = req.body.image;
   var rating = req.body.rating;
   var desc = req.body.description;
   //make new game object from variables
   var newGame = {name: name, image: image, rating: rating, stars: 0, description: desc};
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