var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
	username: String,
	id: String
});

let User = mongoose.model("users", UserSchema);

module.exports = User;