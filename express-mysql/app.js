var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import express-session
var session = require('express-session');
// import express-flash
var flash = require('express-flash');
// import method-override
var methodOverride = require('method-override');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// import posts route
var postsRouter = require('./routes/posts');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure session and flash
app.use(session({
    secret: 'keyboard cat', // Kunci rahasia untuk sesi
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // Masa berlaku cookie sesi (dalam milidetik)
}));
app.use(flash());

// configure method-override (untuk mendukung PUT/DELETE dari form HTML)
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter); // MENGGUNAKAN ROUTE POSTS

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