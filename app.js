const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const methodOverride = require('method-override');
require('dotenv').config();

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const regRouter = require('./routes/reg');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const patientsRouter = require('./routes/patients');
const profileRouter = require('./routes/profile.js');


// MongoDB connection
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

// Save sessions in mongoDB
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store,
}));

// Save session in locals
app.use((req, res, next) => {
  res.locals.auth = req.session.auth;
  res.locals.user = req.session.user;
  next();
});


// Allows you to use PUT, DELETE with forms.
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Connect routes
app.use('/', indexRouter);
app.use('/reg', regRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/patients', patientsRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
