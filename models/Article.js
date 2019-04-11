var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create a new article schema. The link should be unique, but the other properties are not required because they may not exist on the website to be scraped. There is validation on the route to add them to the database on if these properties exist.
var articleSchema = new Schema({
    title: {
        type: String,
        require: false
    },
    link: {
        type: String,
        unique: true,
        require: false
    },
    intro: {
        type: String,
        require: false
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Create the Article model using the noteSchema
var Article = mongoose.model("Article", articleSchema);

// Export the Article model
module.exports = Article;