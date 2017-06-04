var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String, unique: true},
	password_hash: {type: String, required: true},
	telnumber: {type: String, unique: true},
	email: {type: String, unique: true},
	avatar_url: {type:String, default: ""},		//to add a picture url here
	tickets: [{type: Schema.ObjectId, ref:'Ticket', default: null}],
	film_favourite: [{type: Schema.ObjectId, ref:'File', default: null}]
}, {collection:'User'});

var User = mongoose.model('User', UserSchema);
