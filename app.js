const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      // 路由信息 存放在 ./routes 目录下
      indexRouter = require('./routes/index'),
      docsRoute = require('./routes/docs'),
      huluxiaRoute = require('./routes/huluxia'),
      utilsRoute  = require('./routes/utils')
      app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // 模板渲染引擎为 jade

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/docs',docsRoute);
app.use('/huluxia',huluxiaRoute);
app.use('/utils',utilsRoute)

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
