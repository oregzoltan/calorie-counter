'use strict';
const db = require('./db');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

app.post('/meals', function(req, res) {
  db.addMeal(req, function (result) {
    res.send(result);
  });
});

app.get('/meals', function(req, res) {
  db.getMeal(req, function (result) {
    res.send(result);
  });
});

app.delete('/meals/:id', function(req, res) {
  db.delMeal(req, function (result) {
    if (result.affectedRows === 1) {
      res.send({"status": "ok"});
    } else {
      res.send({"status": "not exists"});
    }
  });
});

app.listen(3000);
