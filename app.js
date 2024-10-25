var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/oauth');
var requestRouter = require('./routes/request');
// var htmlAuthRouter = require('./routes/htmlAuth');
// var htmlFileRouter = require('./routes/htmlResponse');

var app = express();

app.options('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://www.alkena.live");
  res.header("Access-Control-Allow-Credentials", "false");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, credentials");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.status(200);
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/oauth', authRouter);
app.use('/request', requestRouter);

app.use(function(req, res, next){
  next(createError(404));
})
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app