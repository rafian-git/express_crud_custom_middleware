var express = require('express');
var router = express.Router();

var loginModel = require.main.require('./models/login-model');

router.get('/login', function (req, res){
	res.render('login/loginview', {message: ''});
});


router.post('/login', function (req, res){
	var user = {
		username: req.body.username,
		password: req.body.password
	};
	loginModel.verifyUser(user, function(valid){
		if(valid)
		{
			req.session.loggedUser = user;
			res.redirect('/home');
		}
		else
		{
			res.render('login/loginview', {message: 'Invalid username or password'});
		}
	});

});

module.exports = router;