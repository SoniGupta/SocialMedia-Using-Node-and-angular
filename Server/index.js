var express = require('express');
var app = express();
var bodyParser=require('body-parser');

app.get('/',function(req, res){
	res.send('Home route');
});

app.listen(8000, function(){
	console.log('Server started');
});
// {
// 	console.log('server started');
// },8000);