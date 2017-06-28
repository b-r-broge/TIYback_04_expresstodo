const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const models = require('./models');
const sequelize = require('sequelize');
// const todoFile = "./list/todo.json";

var date = new Date();
const todo = models.todolist;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache', mustacheExpress());
app.set('views', './list')
app.set('view engine', 'mustache')
app.use(express.static(__dirname));

app.get('/list', function(req, res) {
  todo.findAll().then(function(data) {
    // console.log(data);
    res.render('todo', {todolist: data});
  });
});

app.post('/add', function(req, res) {
  console.log('adding item', req.body.newItem);
  const row = todo.build({
    todo: req.body.newItem,
    description: req.body.description,
    created_at: new Date()
  });
  row.save().then(function (newTodo) {
    // do things
    console.log("new todo:", newTodo);
    res.redirect('/list');
  });
});

app.post('/edit', function(req, res) {
  console.log('edit item', req.body.edit);
  todo.update({
    todo: req.body.todo,
    description: req.body.description
  }, {where: {
    id: req.body.edit
  }}).then(function(doneItem) {
    console.log('editing item');
    // console.log(doneItem);
    res.redirect('/list');
  });
});

app.post('/delete', function(req, res) {
  console.log('delete item', req.body.deleteId);
  todo.destroy({
    where: {
      id: req.body.deleteId
    }
  }).then(function(deletedItem) {
    console.log('item deleted');
    res.redirect('/list');
  })
});

app.post('/clearDone', function(req, res) {
  console.log('delete all done items');
  todo.destroy({
    where: {
      completed_at: {
        $ne: null
      }
    }
  }).then(function(allGone) {
    console.log('all done items deleted');
    res.redirect('/list');
  })
})

app.post('/remove', function(req, res) {
  console.log('removing item', req.body.doneId);
  // console.log(req.body);
  var done = req.body.doneId;
  todo.update({
    completed_at: new Date
  }, {where: {
    id: done
  }}).then(function(doneItem) {
    console.log('moving item to complete');
    // console.log(doneItem);
    res.redirect('/list');
  })
});

app.listen(3000, function () {
  console.log('started on port 3000');
})
