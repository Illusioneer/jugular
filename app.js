 var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , feed = require('./routes/feed')
  , post = require('./routes/posts')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 9123);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users/:name', user.list);
app.get('/jason', user.jason);
app.get('/vuz', user.backbone);
app.get('/rss', feed.rss);
app.get('/new', post.new);
app.post('/post', post.submit);
app.get('/blarg', post.blarg);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
