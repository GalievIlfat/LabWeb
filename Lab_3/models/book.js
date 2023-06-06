var mongoose = require("mongoose"),
	ObjectId = mongoose.Schema.Types.ObjectId;

var bookSchema = mongoose.Schema({
	description: String,
	tags: [ String ],
	owner : { type: ObjectId, ref: "users" }
});

var book = mongoose.model("books", bookSchema); 
module.exports = book;