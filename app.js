
/**
 * Module dependencies.
 */

var express = require('express');
var orm = require('orm');
var http = require('http');
var path = require('path');
var sms = require('./sms');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(orm.express("mysql://root:root@localhost/sms", {
	define: function(db, models, next) {
		models.sms = db.define("sms", { name: { type: "text", size: 20 }, number: { type: "text", size: 20 }, day: { type: "number"}});

		next();
	}
}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/send/', sms.send);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
