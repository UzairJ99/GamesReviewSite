var mongoose = require("mongoose");
var Game = require("./models/games");
var Comment   = require("./models/comments");
 
var data = [
    {
        name: "Spider-man PS4", 
        image: "/images/spiderman.jpg",
        rating: "Teen",
        stars: 4
    },
    {
        name: "Assassin's Creed: Unity", 
        image: "/images/assassins creed unity.jpg",
        rating: "Mature",
        stars: 3.8
    },
    {
        name: "Need For Speed: Rivals", 
        image: "/images/nfs rivals.jpg",
        rating: "Everyone 10+",
        stars: 4
    }
];
 
function seedDB(){
   //Remove all campgrounds
   Game.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all games");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed all comments");
             //add a few campgrounds
            data.forEach(function(seed)
            {
                Game.create(seed, function(err, game)
                {
                    if(err)
                    {
                        console.log(err)
                    } 
                    else 
                    {
                        console.log("Added a new game");
                        //create a comment
                        Comment.create(
                            {
                                text: "Cool game.",
                                author: "Gamer123"
                            }, function(err, comment)
                            {
                                if(err)
                                {
                                    console.log(err);
                                } 
                                else 
                                {
                                    game.comments.push(comment);
                                    game.save();
                                    console.log("Added new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;