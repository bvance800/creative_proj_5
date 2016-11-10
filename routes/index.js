/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

console.log("connect to database");
mongoose.connect('mongodb://localhost/itemsssDB'); //Connects to a mongo database called "commentDB"


var cartItemSchema = mongoose.Schema({ //Defines the Schema for this database
img: String,
price: Number,
description: String,
id: Number
});

var CartItem = mongoose.model('CartItem', cartItemSchema);


var db = mongoose.connection;
console.log("Check for errors...");
db.on('error', console.error.bind(console, 'connection error:')); //checks for conncetion erros

db.once('open', function () {
    db.db.listCollections().toArray(function (err, names) {
        console.log("Printing collections");
	console.log(err, names);
       db.close();
    });
});


/*
var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});
*/
var express = require('express');
var router = express.Router();

router.post('/addCartItem', function(req,res, next){
	console.log("POST cart item route");
	
	var newItem = new CartItem(req.body);
	console.log("NEW ITEM: " + newItem);	
	newItem.save(function(err, post) {
		if(err){ return console.log(err);}
		console.log("Posted " + post);
		res.sendStatus(200);
	});

});

module.exports = router;
