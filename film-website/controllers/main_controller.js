module.exports = function(app) {
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

	app.get('/register', function(req, res){
		console.log('request to register page');
		if(req.session.user) {
			res.redirect('/');
		}
		else {
			res.render('auth/register');
		}
	});
}
