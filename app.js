var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var authRouter = require('./routes/oauth');
var requestRouter = require('./routes/request');
// var htmlAuthRouter = require('./routes/htmlAuth');
// var htmlFileRouter = require('./routes/htmlResponse');

var app = express();

const corsOptions = {
  origin: '*', // Replace '*' with specific origins in production if needed
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // Optional: Allow cookies or Authorization headers
};

app.use(cors(corsOptions));


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