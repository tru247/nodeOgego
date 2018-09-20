var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Get hello world page*/
router.get('/helloworld', function(req, res){
	res.render('helloworld', {title: 'Hello world!'});
});

/*Get userList page*/
router.get('/userlist', function(req, res){
	var db = req.db;
	var collection = db.get("usercollection");
	collection.find({}, {}, function(e, docs){
		res.render('userlist', {
			"userlist": docs
		})
	});
});

/*get new user page*/
router.get('/newuser', function(req, res){
	res.render('newuser', {title: "Add New User"});
});

/*Post to Add user Service*/
router.post('/adduser', function(req, res){
	//set our internal DB variable
	var db = req.db;

	//Get our form values. These rely on the name attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//Set our collection
	var collection = db.get('usercollection');

	//Submit to the db
	collection.insert({
		"username": userName,
		"email": userEmail
	}, function(err, doc){
		if(err){
			//if it failed, return error
			res.send("There was a problem adding the info to the db");
		}else{
			//And forward to sucess page
			res.redirect('userlist');
		}
	});
});

module.exports = router;
