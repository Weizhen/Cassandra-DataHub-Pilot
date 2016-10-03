/*

Cassandra connection management and pooling

*/
var driver = require('../datadrivers/user.js');

const cassandra = require('cassandra-driver');

var hosts = ['127.0.0.1'];

var ks = ['dev'];

const distance = cassandra.types.distance;

const options = {
   contactPoints: hosts,
   keyspace: ks
};


const client = new cassandra.Client(options);


// Establish connection
exports.start = function () { 
	client.connect(function (err) {
	  if (err) 
	  	return console.error(err);


	  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());

	});
};

// Helper query wrapper

exports.user = {};

exports.user.createNew = function (data,cb) {
	driver.createNew(client, data, cb);
};


exports.user.updateExisting = function (data,cb) {
	driver.updateExisting(client, data, cb);
};

exports.user.readExisting = function (data,cb) {
	console.log("Entering DB connection");
	driver.readExisting(client, data, cb);
};
