var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

var cors = require('cors');
var jwt = require('express-jwt');
var index = require('./routes/index');
var users = require('./routes/users');
var clubs = require('./routes/clubs');
var events = require('./routes/events');



var port=3000;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('.html', require('ejs').renderfile);

//set static folder  it is in this folder that we add the angular files


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', index);

//to use the api
app.use('/clubs', clubs)
app.use('/events', events)

app.use('/users', users);

// var authCheck = jwt({
//   secret: new Buffer('mjBE0eskVXIZGNLIDSIh1EDbnPV53Vf1ecavELZb_9s1b7ZbcSt5dwGEJZhXa51o', 'base64'),
//   audience: 'WnoqRrrS5k6PX7o67juJi0hDlzCvudls'
// });

app.use(function(req, res,next) {
res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//app.listen(port, ()=>{console.log("the server started")})


//module.exports = app;
