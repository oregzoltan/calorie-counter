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

app.post('/meals', function(req, res) {
  con.query('INSERT INTO meals SET ?', { name: req.body.name, calories: req.body.calories, date: req.body.date}, function(err,row){
    if(err) {
      console.log(err);
      return;
    }
  res.send({"status": "ok"});
  });
});

app.get('/meals', function(req, res) {
  con.query('SELECT * FROM meals;',function(err,rows){
    if(err) {
      console.log(err);
      return;
    }
    res.send(rows);
  });
});

app.delete('/meals/:id', function(req, res) {
  con.query('DELETE FROM meals WHERE id = ' + req.params.id, function(err,row){
    if(err) {
      console.log(err.toString());
      return;
    }
    if (row.affectedRows === 1) {
      res.send({"status": "ok"});
    } else {
      res.send({"status": "not exists"});
    }
  });
});

app.listen(3000);
