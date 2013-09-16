var sys = require('sys')
  , Couchbase = require('couchbase')
  , bcrypt = require('bcrypt');

function CouchbaseAdminUser(){
  this.fields = {};

  /* used for validation of document */
  var CouchbaseAdminUser = {

  };
};

CouchbaseAdminUser.prototype.toSessionStore = function(){
  var serialized = {};

  for(var i in this){
    if(typeof i !== 'function' || typeof i !== 'object'){
      serialized[i] = this[i];
    }
  }

  return JSON.stringify(serialized);
};

CouchbaseAdminUser.prototype.fromSessionStore = function(sessionStore){
  var sessionObject = JSON.parse(sessionStore);
  var adminUser = new CouchbaseAdminUser();

  for(var i in sessionObject){
    if(sessionObject.hasOwnProperty(i)){
      adminUser[i] = sessionObject[i];
    }
  }

  return adminUser;
};

CouchbaseAdminUser.prototype.ensureUserExists = function(username, password, callback){

};

CouchbaseAdminUser.prototype.getByUsernamePassword = function(username, password, callback){

};

exports.CouchbaseAdminUser = CouchbaseAdminUser;