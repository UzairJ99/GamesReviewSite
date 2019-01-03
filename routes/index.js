//declare dependant variables
var express = require("express");
//replaces app. with router.
var router = express.Router();
//get passport.js
var passport = require("passport");
//mongoose models
var Game = require("../models/games"),
    Comment = require("../models/comments"),
    User = require("../models/user");

//call landing page
router.get("/", function(req,res)
{
    //renders the landing page
    res.render("landing");
});

//authentication routes
router.get("/register", function(req,res)
{
    res.render("register");
});

//handle sign up
router.post("/register", function(req, res)
{
    //create new user without a password
    var newUser = new User({username:req.body.username});
    //register the user and assign a password
    User.register(newUser, req.body.password, function(err, user)
    {
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function()
        {
            res.redirect("/games");
        });
    });
});

//show login form
router.get("/login", function(req,res)
{
    res.render("login");
});

//login handling
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/games", 
    failureRedirect: "/login"
}),
function(req, res)
{
});

//logout route
router.get("/logout", function(req, res)
{
    req.logout();
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