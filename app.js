var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dailyWeatherRouter = require('./routes/daily_weather');
var weeklyWeatherRouter = require('./routes/weekly_weather');

// 天气列表展示接口
var weatherRouter = require('./routes/weather');
var weatherLocalRouter = require('./routes/weather_local');
var weatherLocalRouter2 = require('./routes/weather_local_2');


// 温度图接口
var dailyTemperature = require('./routes/daily_temperature');
var dailyTemperatureLocal = require('./routes/daily_temperature_local');
var dailyTemperatureLocal2 = require('./routes/d2');


// 每小时图接口
var hourlyWeather = require('./routes/hourly_weather');
var hourlyWeatherLocal = require('./routes/hourly_weather_local');
var hourlyWeatherLocal2 = require('./routes/h2');


// 自动填充
var autoComplete = require('./routes/auto_complete');
var autoCompleteLocal = require('./routes/auto_complete_local');



var app = express();

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRouter);
app.use('/daily_weather', dailyWeatherRouter);
app.use('/weekly_weather', weeklyWeatherRouter);
app.use('/weather_local', weatherLocalRouter);
app.use('/daily_temperature', dailyTemperature);
app.use('/daily_temperature_local', dailyTemperatureLocal);
app.use('/hourly_weather', hourlyWeather);
app.use('/hourly_weather_local', hourlyWeatherLocal);
app.use('/auto_complete', autoComplete);
app.use('/auto_complete_local', autoCompleteLocal);
app.use('/weather_local_2', weatherLocalRouter2);
app.use('/hourly_weather_local_2', hourlyWeatherLocal2);
app.use('/daily_temperature_local_2', dailyTemperatureLocal2);



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
