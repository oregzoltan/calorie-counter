'use strict';

var test = require('tape');
var functionTest = require('./functionstotest');

var obj = [{calories:1}, {calories:2}, {calories:3}];

test('is returning a number', function (t) {
  t.notEqual(functionTest.calculateSum(obj), 'a');
  t.end();
});

test('is working on a list of objects', function (t) {
  t.equal(functionTest.calculateSum(obj), 6);
  t.end();
});

test('is returning the correct sum', function (t) {
  t.notEqual(functionTest.calculateSum(obj), 5);
  t.end();
});

test('is returned time in good format', function (t) {
  t.equal(functionTest.formatDate(new Date(1980, 5, 26, 12, 20)), '1980-6-26 12-20');
  t.end();
});
