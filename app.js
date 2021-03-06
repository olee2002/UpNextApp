require('dotenv').config()
var express = require('express')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {
  console.log('Mongoose has connected to MongoDB!')
})
mongoose.connection.on('error', (error) => {
  console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
  process.exit(-1)
})


var users = require('./routes/users');
var stores = require('./routes/stores');
var items = require('./routes/items');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//redirect to the /users page on load
app.get('/', (req, res) => {
  res.redirect('/users')
})

app.use('/users', users)
app.use('/users/:userId/stores', stores)
app.use('/users/:userId/stores/:storeId/items', items)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}



  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
