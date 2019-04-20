const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      // 路由信息 存放在 ./routes 目录下
      indexRouter = require('./routes/index'),
      docsRoute = require('./routes/docs'),
      huluxiaRoute = require('./routes/huluxia'),
      utilsRoute  = require('./routes/utils'),
      app = express(),
      ajax = require('./utils/http').ajax,
      corsAnywhere = require('cors-anywhere')

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
app.use('/utils',utilsRoute);

let proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [] // Do not remove any headers.
});

/* Attach our cors proxy to the existing API on the /proxy endpoint. */
app.get('/proxy/:proxyUrl*', (req, res) => {
  req.url = req.url.replace('/proxy/', '/'); // Strip '/proxy' from the front of the URL, else the proxy won't work.
  proxy.emit('request', req, res);
});

// add cors
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",'@d1y')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

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
