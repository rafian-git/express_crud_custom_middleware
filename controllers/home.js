var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.use('*', function(req, res, next){
	if(! req.session.loggedUser)
	{
		res.redirect('/login');
		return;
	}
	next();
});

router.use('*', function(req, res, next){
	if(! req.session.loggedUser)
	{
		res.redirect('/login');
		return;
	}
	next();
});

router.get('/home/edit/:id', function(req, res){
	var id = req.params.id;
	userModel.get(id, function(result){
		res.render('home/edit', {user: result});
	});

});

router.post('/home/edit/:id', function(req, res){
	var user = {
		userId: req.body.userId,
		username: req.body.username,
		password: req.body.password
	};
	userModel.update(user, function(result){
		res.redirect('/home');
	});

});

router.get('/home/create', function(req, res){
	res.render('home/create');
});

router.post('/home/create', function(req, res){
	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.insert(user, function(result){
		res.redirect('/home');
	})
});

router.get('/home', function(req, res){
	if(req.session.loggedUser)
	{
		userModel.getAll(function(result){
			//console.log(result);
			res.render('home/index', {
				user: req.session.loggedUser,
				userList: result
			});
		});
		
	}
	else
	{
		res.redirect('/login');
	}
});

module.exports = router;