var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
// var makesRouter = require('./routes');
// var fs = require('fs');
// var path = require('path');
// var mime = require('mime');
var bodyParser = require('body-parser');
// var socketio = require('socket.io');
var models = require('./models');
var routes = require('./routes');


// ... other stuff



// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', { noCache: true });
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

app.get('/', function (req, res, next) {
  res.render('layout');
});

// models.User.sync({})
//   .then(function () {
//     return models.Page.sync({})
//   })
models.db.sync({ force: true })
  .then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
      console.log('Server is listening on port 3000!');
    });
  })
  .catch(console.error);
