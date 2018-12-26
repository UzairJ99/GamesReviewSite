//set up express js
var express = require("express");
var app = express();
//body parser will allow us to extract text from a form
var bodyParser = require("body-parser");

//allows shortcut to not include /public in all directory calls
app.use(express.static(__dirname +"/public"));

//will allow me to skip the .ejs after every ejs type file name
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

//array of objects each having attributes name and image
    var games = [
        {name: "Spider-man PS4", image: "/images/spiderman.jpg"},
        {name: "Assassin's Creed: Unity", image: "/images/assassins creed unity.jpg"},
        {name: "Need For Speed: Rivals", image: "/images/nfs rivals.jpg"}
    ];

//call landing page
app.get("/", function(req,res)
{
    //renders the landing page
    res.render("landing");
});

//call games page
app.get("/games", function(req, res)
{
    //passing in the games array and naming it games
    //the array is the one after the :
    res.render("games", {games: games});
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
   //add to the array
   games.push(newGame);
   //redirect to main games page
   res.redirect("/games");
});

//start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started.");
});