//https://stackoverflow.com/questions/22202232/express-has-no-method-configure-error

var express = require('express'),
app = express(),
http = require('http'),
path = require('path'),
gapi = require('./lib/gapi');

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.get('/', function(req, res) {
    var locals = {
        title: 'This is my sample app',
        url: gapi.url
    };
    res.render('index.jade', locals);
});

app.get('/oauth2callback', function(req, res) {
  var code = req.query.code;
  gapi.client.getToken(code, function(err, tokens){
    gapi.client.credentials = tokens;
    //getData();
  });
  var locals = {
        title: 'May sample app',
        url: gapi.url
      };
  res.render('index.jade', locals);
});

var getData = function() {
  gapi.oauth.userinfo.get().withAuthClient(gapi.client).execute(function(err, results){
      console.log(results);
  });
  gapi.cal.calendarList.list().withAuthClient(gapi.client).execute(function(err, results){
    console.log(results);
  });
};

var server = app.listen(3000);

console.log('Express server started on port %s', server.address().port);


// var express = require('express'),
// app = express(),
// http = require('http'),
// path = require('path'),
// gapi = require('./lib/gapi');
// errorHandler = require('errorhandler');

// // if ('development' == app.get('env')) {
// //     // app.use(express.errorHandler());
// //     app.use(errorHandler());
// // }
// // app.configure('development', function() {
// // app.use(express.errorHandler());
// // });
// // app.configure(function() {
// app.set('port', process.env.PORT || 3000);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// // app.use(express.favicon());
// // app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.cookieParser());
// app.use(express.methodOverride());
// app.use(app.router);
// // });

// app.get('/', function(req, res) {
// var locals = {
//     title: 'This is my sample app'
//   };
// res.render('index.jade', locals);
// });

// var server = app.listen(3000);

// console.log('Express server started on port %s', server.address().port);