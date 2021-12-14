const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    // Databasen förväntar sig att få
    // firstname, email, title oh content.
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, 
});

module.exports = mongoose.model("Post", PostSchema)