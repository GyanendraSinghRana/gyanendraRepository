var express =require("express");
var bp = require("body-parser");
var MongoClient = require('mongodb').MongoClient

//Create our appCodeName

var app = express();
var db

MongoClient.connect('mongodb://admin:admin@ds059316.mlab.com:59316/gydatabase', 
(err,database) =>{
	if(err)  return  console.log(err)
		db = database
})



app.use(bp.json());
var arr = [];

 app.get('/', function(req,res){
	res.send('Welcome to root');
});

app.get('/getmydata', (req,res) =>{
	db.collection('mydb').find().toArray((err, result) => {
		if(err) return console.log(err)
			res.json(result);
	})
})

app.post('/postmydata',function(req,res){
	
	db.collection('mydb').save(req.body, (err, result) => {
		if(err) return console.log(err)
			console.log('saved to database')
})
})

app.listen(3000, function(){
	console.log('Server is up on port 3000');
});