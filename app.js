//set up express js
var express = require("express");
var app = express();

//will allow me to skip the .ejs after every ejs type file name
app.set("view engine", "ejs");

//call landing page
app.get("/", function(req,res)
{
    //renders the landing page
    res.render("landing");
});

app.get("/games", function(req, res)
{
    //array of objects each having attributes name and image
    var games = [
        {name: "Spiderman", image: ""},
        {name: "Assassin's Creed", image: ""},
        {name: "Need For Speed: Rivals", image: ""}
    ]
    
    //passing in the games array and naming it games
    //the array is the one after the :
    res.render("games", {games: games});
});

//start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started.");
});