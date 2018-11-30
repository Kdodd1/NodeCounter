var express = require("express");
var session = require("express-session");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000}
}))

app.get('/', function (request, response){

  request.session.counter += 1;
  var data = [
    {counter: request.session.counter}
  ];
  response.render('index', {data: data});
})

app.get('/two', function (request,response){
  request.session.counter += 1;
  response.redirect('/')
})
app.get('/reset', function (request,response){
  request.session.counter = -1;
  response.redirect('/')
})

app.listen(8000, function(){
  console.log("Listening on port 8000")
})
