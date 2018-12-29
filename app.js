//set up express js
var express = require("express"),
    app = express(),
//body parser will allow us to extract text from a form
    bodyParser = require("body-parser"),
//support mongo db
    mongoose = require("mongoose");
    
//connect to database (format is for newest version of mongoose)
mongoose.connect("mongodb://localhost:27017/games", {useNewUrlParser: true});

//schema setup
var gameSchema = new mongoose.Schema(
    {
        name: String,
        image: String
    });

//create model using above schema   
var Game = mongoose.model("Game", gameSchema);

//test creating an object for the database
// Game.create(
//     {
//         name: "Need For Speed: Rivals", 
//         image: "/images/nfs rivals.jpg"
        
//     }, function(err, game)
//     {
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("Created new game: ");
//             console.log(game);
//         }
//     });


//allows shortcut to not include /public in all directory calls
app.use(express.static(__dirname +"/public"));

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
            res.render("games", {games: allgames});
        }
    });
});

//call page with form making a new post
app.get("/games/new", function(req,res)
{
    res.render("new");
});

//form submits a post request for a new game
app.post("/games", function(req, res)
{
   //get data from form and add to games array 
   var name = req.body.name;
   var image = req.body.image;
   //make new game object from variables
   var newGame = {name: name, image: image};
   //add to the database
   Game.create(
    {
        name: name, 
        image: image
        
    }, function(err, newgame)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/games");
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

//start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started.");
});