var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplySchema = new Schema({
	username: String,
	subject: String,
	content: String,
	timestamp: {type: Date, default: Date.now},
	replies: [{type: Schema.ObjectId, ref:'Reply', default: null}]
}, {collection:'Reply'});

var CommentSchema = new Schema({
	username: String,
	film_name: String,
	title: {type: String, required: true},
	content: String,
	timestamp: {type: Date, default: Date.now},
	replies: [{type: Schema.ObjectId, ref:'Reply', default: null}]
}, {collection:'Comment'});

var Reply = mongoose.model('Reply', ReplySchema);
var Comment = mongoose.model('Comment', CommentSchema);
