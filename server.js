// Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// var bodyParser = require("body-parser");

// Set up port 
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// Require the routes
var routes = require("./routes");

// Make public a static folder
app.use(express.static("public"));

// Connect Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // Use bodyParser in our app
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Have every request go through the route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

// Listen on the port
app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});
