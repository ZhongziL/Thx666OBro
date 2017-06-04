var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function hashPW(password) {
	return crypto.createHash('sha256').update(password)
				.digest('base64').toString();
}

exports.login = function(req, res){};

exports.register = function(req, res){};
