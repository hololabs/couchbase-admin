var sys = require('sys')
  , Couchbase = require('couchbase');

exports = module.exports = CouchbaseAdmin;
exports.version = '0.0.1';

var app;

exports.createAdmin = function(dbConfig, options){
  if(options.port){
    var app = app || (app = require('./http'));

    app.listen(options.port);
    require('./http/paths').registerPaths(app, '/');

    CouchbaseAdmin.singleton = new CouchbaseAdmin(dbConfig.uri, app, '');
    return CouchbaseAdmin.singleton;
  }else if(options.app && options.root){
    require('./http/paths').registerPaths(options.app + '/' + options.root);
    options.app.use(require('express').static(__dirname + '/http/static'));

    CouchbaseAdmin.singleton = new CouchbaseAdmin(dbConfig.uri, options.app, '/' + options.root);
    return CouchbaseAdmin.singleton;
  }
};

function CouchbaseAdmin(dbConfig, app, root){
  this.app = app;
  this.root = root;
};

/**
 * Register a new couchbase view with admin
 */
CouchbaseAdmin.prototype.buildPath  = function(path){
  return this.root + path;
};

/**
 * Register a new couchbase view with admin
 */
CouchbaseAdmin.prototype.pushExpressConfig = function(){
  var currentViewsPath = CouchbaseAdmin.singleton.app.set('views');
  this.app.set('views', __dirname + '/http/views');
  return {'views' : currentViewsPath};
};

/**
 * Register a new couchbase view with admin
 */
CouchbaseAdmin.prototype.popExpressConfig = function(config){
  this.app.set('views', config.views);
};

/**
 * Register a new couchbase view with admin
 */
CouchbaseAdmin.prototype.close = function(){
  this.app.close();
};

/**
 * Register a new couchbase view with admin
 */
CouchbaseAdmin.prototype.registerView = function(viewName, options){
};

/**
 * Retrieve a list of all registered views
 */
CouchbaseAdmin.prototype.getRegisteredViews = function(callback){
  var views = [];

  for(viewName in this.views){
    views.push(this.views[viewName].view);
  }

  callback(null, models)
};

CouchbaseAdmin.prototype.getView = function(viewName, callback){
  callback(null, this.views[viewName].view, this.views[viewName].options);
};

CouchbaseAdmin.prototype.getDocument = function(documentId, callback){

};

CouchbaseAdmin.prototype.createDocument = function(user, params, callback){

};

CouchbaseAdmin.prototype.updateDocument = function(user, documentId, params, callback){

};

CouchbaseAdmin.prototype.deleteDocument = function(user, documentId, callback){

};

CouchbaseAdmin.prototype.userFromSessionStore = function(sessionStore){
  return CouchbaseAdmin.fromSessionStore(sessionStore);
};

CouchbaseAdmin.prototype.ensureUserExists = function(username, password){
  CouchbaseAdmin.ensureUserExists(username, password, function(err, adminUser){
    if(!err){
      console.log('Created admin user: ' + adminUser.username);      
    }
  });
};

CouchbaseAdmin.prototype.login = function(username, password, callback){
  CouchbaseAdmin.getByUsernamePassword(username, password, function(err, adminUser){
      callback(err, adminUser);
  });
};