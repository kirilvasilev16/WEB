var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.get('/GET', function (req, res) {
	connection.query('SELECT * FROM SHIRTS', function (err) {
		if (err) { return next(err);}
        res.send();
	});
});

app.post('/ADD', function (req, res) {
	connection.query("INSTERT INTO SHIRTS VALUES (NULL, '', '', '', 'XS')", function (err) {
		if (err) { return next(err);
        		res.send();}
        else {
			connection.query('SELECT * FROM SHIRTS ORDER BY ID DESC LIMIT 1', function (err) {
				if (err) { return next(err);}
                res.send();
				res.json();
			})
		}
	})
});

app.delete('/DELETE', function (req, res) {
	connection.query('DELETE FROM SHIRTS WHERE ID=?', [req.query.id], function (err) {
		if (err) { return next(err);}
        res.send();
	});
});

app.post('/EDIT', function (req, res) {
	connection.query('UPDATE SHIRTS SET firstName = ? , lastName = ? , shirtSize = ? , shirtColor = ? WHERE ID = ?', [req.query.firstName, req.query.lastName, req.query.shirtSize, req.query.shirtColor, req.query.id], function (err) {
		if (err) { return next(err);}
		res.send();
	});
});

app.listen(port, function() {
	console.log('You may now request the application: http://localhost:%d/', port);
});