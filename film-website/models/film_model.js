var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmSchema = new Schema({
	film_name: {type: String, unique: true},
	film_detail: String,
	picture_url: String,
	video_link: String,
	user_favourite: [{type: Schema.ObjectId, ref:'User', default: null}]
}, {collection:'Film'});

var Film = mongoose.model('Film', FilmSchema);
