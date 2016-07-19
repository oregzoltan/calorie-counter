'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

var mysql = require("mysql");

var con = mysql.createConnection({
  database: "caloriecounter",
  host: "localhost",
  user: "root",
  password: "velox"
});

con.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

var Meals = (function () {

  function errorHandler(err) {
    if(err) {
      console.log(err.toString());
      return;
    }
  }

  function publicAddMeal (req, cb) {
    con.query('INSERT INTO meals SET ?', { name: req.body.name, calories: req.body.calories, date: req.body.date}, function(err,row){
      errorHandler(err);
      cb({id: row.insertId, name: req.body.name, calories: req.body.calories, date: req.body.date});
    });
  }

  function publicGetMeal (req, cb) {
    con.query('SELECT * FROM meals;',function(err,rows){
      errorHandler(err);
      cb(rows);
    });
  }

  function publicDelMeal (req, cb) {
    con.query('DELETE FROM meals WHERE id = ' + req.params.id, function(err,row){
      errorHandler(err);
      cb(row);
    });
  }

  return {
    addMeal: publicAddMeal,
    getMeal: publicGetMeal,
    delMeal: publicDelMeal
  };
})();

app.post('/meals', function(req, res) {
  Meals.addMeal(req, function (result) {
    res.send(result);
  });
});

app.get('/meals', function(req, res) {
  Meals.getMeal(req, function (result) {
    res.send(result);
  });
});

app.delete('/meals/:id', function(req, res) {
  Meals.delMeal(req, function (result) {
    if (result.affectedRows === 1) {
      res.send({"status": "ok"});
    } else {
      res.send({"status": "not exists"});
    }
  });
});

app.listen(3000);
