//set up express js
var express = require("express"),
    app = express(),
//body parser will allow us to extract text from a form
    bodyParser = require("body-parser"),
//support mongo db
    mongoose = require("mongoose"),
//calls the mongoose model from games.js
    Game = require("./models/games"),
    Comment = require("./models/comments"),
    seedDB = require("./seeds");

//call function from seeds.js
seedDB();

//connect to database (format is for newest version of mongoose)
mongoose.connect("mongodb://localhost:27017/games", {useNewUrlParser: true});

//allows shortcut to not include /public in all directory calls
app.use(express.static(__dirname + "/public"));

//will allow me to skip the .ejs after every ejs type file name
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

//array of objects each having attributes name and image
    //var games = [
      //  {name: "Spider-man PS4", image: "/images/spiderman.jpg"},
        //{name: "Assassin's Creed: Unity", image: "/images/assassins creed unity.jpg"},
        //{name: "Need For Speed: Rivals", image: "/images/nfs rivals.jpg"}
    //];

//call landing page
app.get("/", function(req,res)
{
    //renders the landing page
    res.render("landing");
});

//call games page
app.get("/games", function(req, res)
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
app.get("/games/new", function(req,res)
{
    res.render("games/new");
});

//call the page to show more info about the game
app.get("/games/:id", function(req, res)
{
    Game.findById(req.params.id).populate("comments").exec(function(err, foundGame)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(foundGame);
            res.render("games/show", {games: foundGame});
        }
    });
});

//form submits a post request for a new game
app.post("/games", function(req, res)
{
   //get data from form and add to games database 
   var name = req.body.name;
   var image = req.body.image;
   var rating = req.body.rating;
   //make new game object from variables
   var newGame = {name: name, image: image, rating: rating, stars: 0};
   //add to the database
   Game.create(newGame, function(err, newgame)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Created new game: ");
            console.log(newgame);
        }
    });
   //redirect to main games page
   res.redirect("/games");
});


//routes for adding a new review
app.get("/games/:id/reviews/new", function(req, res)
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
app.post("/games/:id/reviews", function(req,res)
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

//start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started.");
});