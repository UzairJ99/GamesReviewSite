//set up express js
var express = require("express"),
    app = express(),
//body parser will allow us to extract text from a form
    bodyParser = require("body-parser"),
//support mongo db
    mongoose = require("mongoose"),
//user authentication variables
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
//calls the mongoose models
    Game = require("./models/games"),
    Comment = require("./models/comments"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
//get routes
var gamesRoutes = require("./routes/games"),
    reviewRoutes = require("./routes/reviews"),
    indexRoutes = require("./routes/index");
    
//call function from seeds.js
seedDB();

//Passport configuration
app.use(require("express-session")(
    {
        secret: "blah",
        resave: false,
        saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to database (format is for newest version of mongoose)
mongoose.connect("mongodb://localhost:27017/games", {useNewUrlParser: true});

//allows shortcut to not include /public in all directory calls
app.use(express.static(__dirname + "/public"));

//will allow me to skip the .ejs after every ejs type file name
app.set("view engine", "ejs");

//extracts form information
app.use(bodyParser.urlencoded({extended: true}));

//checks if current user is defined
app.use(function(req, res, next)
{
    res.locals.currentUser = req.user;
    next();
});

//use the routes
app.use("/", indexRoutes);
app.use("/games", gamesRoutes);
app.use("/games/:id/reviews", reviewRoutes);

//start the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started.");
});