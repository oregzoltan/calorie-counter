'use strict';

var tape = require('tape');
var sinon = require('sinon');

var meal = require('./db');

tape('true', function(t) {
  t.equal(true, true);
  t.end();
});

tape('proba have been called', function(t) {
  var callback = sinon.spy();
  callback();
  t.ok(callback.called);
  t.end();
});

tape('proba have been called with 3', function(t) {
  var callback = sinon.spy();
  callback(3);
  t.ok(callback.calledWith(3));
  t.end();
});

tape('addmeal calls query', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);
  testMealModule.addMeal({name: "alma"});
  t.ok(mockConnection.query.called);
  t.end();
});


tape('addmeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var testMeal = {
    name: "alma",
    calories: 2,
    date: "ma"
  };

  var expectedSQL = 'INSERT INTO meals SET ?';

  testMealModule.addMeal(testMeal);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL, testMeal));
  t.end();
});

tape('delMeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var id = 2;

  var expectedSQL = 'DELETE FROM meals WHERE id = ?';

  testMealModule.delMeal(id);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL, 2));
  t.end();
});

tape('filterMeals calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var date = new Date(1980, 6, 26, 12, 20);

  var expectedSQL = 'SELECT * FROM meals WHERE meals.date LIKE "Sat Jul 26 1980 12:20:00 GMT+0200 (Közép-európai nyári idő )%"';

  testMealModule.filterMeals(date);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});

tape('getMeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var expectedSQL = 'SELECT * FROM meals;'

  testMealModule.getMeal();
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});
