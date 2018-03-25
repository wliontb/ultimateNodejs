var mongoose = require("mongoose");

var noteSchema = mongoose.Schema({
    name : String,
    content : String,
    author : String,
    type : String,
});

var note = mongoose.model("note",noteSchema);

module.exports = note;