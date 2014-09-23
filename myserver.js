var express		= require('express');
var mysql		= require('mysql');
var bodyParser 	= require('body-parser');

var app 		= express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//================= mysql =================
var conn 	= mysql.createConnection({
	host: 'localhost',
	database: 'work',
	user: 'admin',
	password: 'admin'
});
conn.connect();
//=========================================

app.get('/api/users', function(req, res) {
	
	conn.query('select * from users', function(err, rows, fields) {
		if(err) res.send(err);

	res.json(rows);
	});
});

app.post('/api/users', function(req, res) {
	
	var code = req.body.code;
	var fname = req.body.fname;
	var sname = req.body.sname;
	var phone = req.body.phone;

	conn.query("insert into users(code, fname, sname, phone) values('"+
		code+"', '"+fname+"', '"+sname+"', '"+phone+"')",
			function(err, rows, fields) {
				if(err) res.send(err);
		});

	res.redirect(200, '/');
});

app.delete('/api/users/:user_id', function(req, res) {

	var id = req.params.user_id;

	conn.query("delete from users where id = " + id,
			function(err, rows, fields) {
				if(err) res.send(err);

		conn.query('select * from users', function(err, rows, fields) {
			if(err) res.send(err);

			res.json(rows);
		});
	});
});

app.get('*', function(req, res) {
		res.sendFile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");