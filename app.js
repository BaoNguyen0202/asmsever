require('dotenv').config()
const createError = require('http-errors');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const methodOverride = require('method-override')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const imageRouter = require('./routes/image')
require('dotenv').config()

mongoose.connect('mongodb+srv://doanhung:lri0l39EKKljSi3w@cluster0.jhi3o.mongodb.net/asm')
    .then(() => console.log('success'))
    .catch(err => console.error(err.message))

const app = express();

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET2))

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/images', imageRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
