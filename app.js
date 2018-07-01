// require
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var login = require('./controllers/login');
var home = require('./controllers/home');


var port = process.env.PORT || 80;
// configure
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));
// routes
app.get('/', function(req, res){
	res.redirect('/login');
});

app.use(login);
app.use(home);


// server
app.listen(port, function(){
	console.log('Server started at ' + port + ' port....');
});