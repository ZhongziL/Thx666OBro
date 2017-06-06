var sms = require('./controllers/ihuyi.js');
var txt = "您的验证码是：2546。请不要把验证码泄露给其他人。";
//var content = require('querystring').stringify(txt);
//console.log(content);

var test = new sms();
test.send("18819253726", txt, function(err, status){
	if(err){
		console.log(err);
	} else {
		console.log(status);
	}
});