const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const jsonfile = require('jsonfile');
const app = express();

const todoFile = "./list/todo.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache', mustacheExpress());
app.set('views', './list')
app.set('view engine', 'mustache')
app.use(express.static(__dirname));

app.get('/list', function(req, res) {
  res.render('todo', jsonfile.readFileSync(todoFile))
});

app.post('/add', function(req, res) {
  console.log('adding item', req.body.newItem);
  // console.log(req.body);
  // console.log(todo);
  // todo.push(req.body.newItem);
  jsonfile.readFile(todoFile, function(err, obj) {
    obj.todo.push(req.body.newItem);
    // console.log(obj);
    jsonfile.writeFile(todoFile, obj, function(err, out) {
      res.redirect('/list');
    });
  });
  // res.redirect('/list');
})

app.post('/remove', function(req, res) {
  console.log('removing item', req.body.doneItem);
  // console.log(req.body);
  var done = req.body.doneItem;
  // todo.splice(todo.indexOf(done), 1);
  // todone.push(req.body.doneItem);
  jsonfile.readFile(todoFile, function(err, obj) {
    obj.todo.splice(obj.todo.indexOf(done), 1);
    obj.todone.push(req.body.doneItem);
    // console.log(obj);
    jsonfile.writeFile(todoFile, obj, function(err, obj){
      res.redirect('/list');
    });
  });
  // res.redirect('/list');
});


app.listen(3000, function () {
  console.log('started on port 3000');
})
