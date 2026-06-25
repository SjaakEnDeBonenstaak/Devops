var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var promBundle = require('express-prom-bundle');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  metricsPath: '/metrics',
  promClient: { collectDefaultMetrics: {} },
});

app.use(metricsMiddleware);

// CORS: sta de frontend toe om de API vanuit de browser te bevragen.
// CORS_ORIGIN mag een komma-gescheiden lijst zijn; '*' staat alle origins toe.
var corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? true : corsOrigin.split(',').map(function (o) { return o.trim(); }),
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
