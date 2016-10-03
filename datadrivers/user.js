/*

User and User attributes related data driver class

*/

const DB = 'dev.user';

//Query escaping helper
var jsesc = require('jsesc');


/*
Create new user with schemaless attributes, 
TODO: Check exist
*/

var createNew = function(client,data,cb){
	console.log("Entering data driver CREATE, data = " + data.uid);
	var t = new Date().getTime().toString();

	data.createdAt = t;
	data.updatedAt = t;

	data = JSON.stringify(data);

	var clause = { 
		query: "INSERT INTO dev.user JSON '" + data + "';" ,
		params: []
	};

	client.execute(clause.query, clause.params, { prepared: true }, function(err) {
		if (err) {
      		return console.error('Create User Error', err);
    	} 
		cb(err);
	});

}


/*
Update existing user with schemaless attributes, 
TODO: Attribute check exist, add parser
*/


var updateExisting = function(client,data,cb){


	var clause = { 
		query: 'UPDATE ' + DB + ' SET attributes = ' + data.attr + ' , updatedAt = ' + now() + ' WHERE id = ' + data.uid + ' IF EXISTS;',
		params: [data.uid, data.attr, now()]
	};

	client.execute(clause.query, clause.params, { prepared: true }, function(err) {
		if (err) {
      		return console.error('Select XXX Error', err);
    	} 
		cb(err);
	});

}


/*
Read existing user with schemaless attributes, 
TODO: add option to select params
*/

var readExisting = function(client,data,cb){

	console.log("Entering data driver READ, data = " + data.uid);
	var clause = { 
		query: "SELECT * FROM " + DB + " WHERE uid = '" + data.uid + "';"
		//params: [data.uid, data.attr, now()]
	};
	console.log("Querying: " + clause.query);
	client.execute(clause.query, [], { prepared: true }, function(err,result) {
		if (err) {
      		client.shutdown();
      		return console.error('Select XXX Error', err);
    	} 
		cb(err,result.rows[0]);
	});

}


/*
Module export
*/
module.exports = {
	createNew: createNew,
	updateExisting: updateExisting,
	readExisting: readExisting
}


