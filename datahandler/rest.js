/*

RESTful API Data handler and routing

*/

var start = function () {
	var restify = require('restify');
	

	// Init data driver
	var driver_user = require('../cassandra/conn.js').user;


	var server = restify.createServer();

	// Parse request body
	server.use(restify.bodyParser({ mapParams: false }));

	/*
	HTTP POST to create new user
	*/
	server.post('/v1/user/create/:uid', function create(req, res, next) {
		if(req.params.uid === req.body.uid){

			driver_user.createNew(req.body, function(err){
				if(!err)
					res.send(201, {status: 'success', uid: req.params.uid});
				else
					res.send(200, {status: 'fail'});
			});


		} else {

			res.send(202, {status: 'fail'});

		}
		return next();
	});


	server.get('/v1/user/read/:uid', function read(req, res, next){

		driver_user.readExisting({uid: req.params.uid.toString()}, function(err, ret) {
			if(!err && ret != undefined) {
				ret.status = "success"
				res.send(200, ret);
			}
			else{
				res.send(200, {status: "fail"})
			}
			return next();
		})

		
	});

	server.listen(8080, function() {
	  console.log('Data Hub Start! \nServer is listening at %s', server.url);
	});
}

module.exports = {
	start: start
}