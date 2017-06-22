const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const app = express();

const todo = ["learn to fly", "learnyounode", "don't embarass yourself"];
const todone = ["learn to ride a bike", "embarass self"];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache', mustacheExpress());
app.set('views', './list')
app.set('view engine', 'mustache')
app.use(express.static(__dirname));

app.get('/list', function(req, res) {
  res.render('todo', {"todo": todo, "todone": todone});
});

app.post('/add', function(req, res) {
  console.log('adding item', req.body.newItem);
  // console.log(req.body);
  // console.log(todo);
  todo.push(req.body.newItem);
  res.redirect('/list');
})

app.post('/remove', function(req, res) {
  console.log('removing item');
  console.log(req.body);
  var done = req.body.doneItem;
  todo.splice(todo.indexOf(done), 1);
  todone.push(req.body.doneItem);
  res.redirect('/list');
})


app.listen(3000, function () {
  console.log('started on port 3000');
})
