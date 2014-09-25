var express			= require('express');
var app 			= express();
var bodyParser 		= require('body-parser');
var mongoose 		= require('mongoose');
var methodOverride 	= require('method-override');

mongoose.connect('mongodb://127.0.0.1:27017/maindb');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var User = mongoose.model('users', {
	code  : String,
	fname : String,
	sname : String,
	phone : String
});

app.get('/api/users', function(req, res) {
	
	User.find(function(err, users) {
	
		if(err) res.send(err);
		
		res.json(users);
	});
});

app.get('/api/users/:user_code', function(req, res) {
    
    User.find({
		
		code : req.params.user_code
	
	}, function(err, users) {

		if(err) res.send(err);
        
        res.json(users);
	});
});

app.post('/api/users', function(req, res) {
	
	User.create({
		code  : req.body.code,
		fname : req.body.fname,
		sname : req.body.sname,
		phone : req.body.phone,
		done  : false
	}, function(err, user) {
		
		if(err) res.send(err);

	});
	res.redirect(200, '/');
});

app.delete('/api/users/:user_id', function(req, res) {

	User.remove({
		
		_id : req.params.user_id
	
	}, function(err, user) {

		if(err) res.send(err);

		User.find(function(err, users) {
			
			if(err) res.send(err);

			res.json(users);
		});
	});			
});

app.get('*', function(req, res) {
	res.sendFile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");