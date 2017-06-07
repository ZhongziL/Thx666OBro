var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function hashPW(password) {
	return crypto.createHash('sha256').update(password)
				.digest('base64').toString();
}

exports.login = function(req, res){
	var jsondata = '';
	req.on('data', function(chunk){
		jsondata += chunk;
	});

	req.on('end', function(){
		var dataObj = JSON.parse(jsondata);
		var reqObj = {
			username : 'hello ' + dataObj.username,
			password : dataObj.password
		};
		res.writeHead(200);
		res.end(JSON.stringify(reqObj));
	});
};

exports.register = function(req, res){
	console.log('fuck');
	console.log(req.body.username);
	console.log(req.body.password);
	console.log(req.body.check_word);
	res.statusCode = 200;
	var data = {
		msg: "fuck"
	};
	data = JSON.stringify(data);
	console.log(data);
	res.write(data);
	res.end();
};
