module.exports = function(app) {
	var user = require('./controllers/user_controller');
	var sms = require('./controllers/ihuyi.js');
	var send_message = new sms();
	
	app.get('/', function(req, res) {
		console.log('request to route /');
		res.send('Hello World');
	});

	app.get('/login', function(req, res) {
		console.log('request to login page');
		if(req.session.user) {
			res.redirect('/');
		}
		else {
			//res.sendfile('./views/auth/login.html');
			res.render('auth/login');
		}
	});

	app.post('/login', user.login);

	app.get('/register', function(req, res){
		console.log('request to register page');
		if(req.session.user) {
			res.redirect('/');
		}
		else {
			res.render('auth/register');
		}
	});

	app.post('/register', user.register);
}
