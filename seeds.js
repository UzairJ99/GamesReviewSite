var mongoose = require("mongoose");
var Game = require("./models/games");
var Comment   = require("./models/comments");
 
var data = [
    {
        name: "Spider-Man PS4", 
        image: "/images/spiderman.jpg",
        rating: "Teen",
        stars: 4.8,
        description: "Marvel's Spider-Man is an action-adventure game developed by Insomniac Games and published by Sony Interactive Entertainment for the PlayStation 4, based on the Marvel Comics superhero Spider-Man. Released worldwide on September 7, 2018, it was the first licensed game developed by Insomniac. The game tells an original story about Spider-Man that is not tied to any other existing piece of media, and covers both the Peter Parker and Spider-Man aspects of the character."
    },
    {
        name: "Assassin's Creed: Unity", 
        image: "/images/assassins creed unity.jpg",
        rating: "Mature",
        stars: 4.2,
        description: "Assassin's Creed Unity is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It was released in November 2014 for Microsoft Windows, PlayStation 4 and Xbox One. It is the eighth major installment in the Assassin's Creed series, and the successor to 2013's Assassin's Creed IV: Black Flag. It also has ties to Assassin's Creed Rogue which was released for the previous generation consoles, the PlayStation 3 and Xbox 360 on the same date." 
    },
    {
        name: "Need For Speed: Rivals", 
        image: "/images/nfs rivals.jpg",
        rating: "Everyone 10+",
        stars: 4,
        description: "Need for Speed Rivals is a racing video game developed in a collaboration between Ghost Games and Criterion Games, and published by Electronic Arts. It is the twentieth installment in the Need for Speed series. The game was released for Microsoft Windows, PlayStation 3, Xbox 360, PlayStation 4 and Xbox One in November 2013."
    },
    {
        name: "Super Smash Bros Ultimate", 
        image: "/images/smash bros.jpg",
        rating: "Everyone 10+",
        stars: 4.4,
        description: "Super Smash Bros. Ultimate is a 2018 crossover fighting game developed by Bandai Namco Studios and Sora Ltd. and published by Nintendo for the Nintendo Switch. It is the fifth installment in the Super Smash Bros. series, succeeding Super Smash Bros. for Nintendo 3DS and Wii U. The game follows the series' traditional style of gameplay: controlling one of various characters, players must use differing attacks to weaken their opponents and knock them out of an arena. It features a wide variety of game modes, including a campaign for a single-player and multiplayer versus modes. "
    }
];
 
function seedDB(){
   //Remove all campgrounds
   Game.remove({}, function(err){
        if(err){
            console.log(err);
        }
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
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
                        //create a comment
                        Comment.create(
                            {
                                text: "Cool game.",
                                author: {username: "The Game Prism"},
                                stars: 3.8
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