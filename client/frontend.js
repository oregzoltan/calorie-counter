'use strict';
var nameOfMeal = document.querySelector('#nameOfMeal');
var calories = document.querySelector('#calories');
var date = document.querySelector('#date');
var addButton = document.querySelector('.addButton');
var nowButton = document.querySelector('.nowButton');
var mealList = document.querySelector('.mealList');
var filter = document.querySelector('#filter');
var filterButton = document.querySelector('.filterButton');
var showAllButton = document.querySelector('.showAllButton');

var url = 'http://localhost:3000/meals';

function createAnElement(id, name, calories, date) {
  var newMeal = document.createElement('li');
  newMeal.classList.add("meal");
  newMeal.textContent = name + ' ' + calories + ' ' + date;
  newMeal.setAttribute('id', id);
  mealList.appendChild(newMeal);
}

function fillDate() {
  date.value = Date().toLocaleString();
}

function xhrRequest(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(data);
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      callback(xhr.response);
    }
  }
}

function getMeals() {
  xhrRequest('GET', url, '', function(response) {
    var data = JSON.parse(response);
    data.forEach(function (e, i) {
      createAnElement(data[i].id, data[i].name, data[i].calories, data[i].date);
    })
  })
}

function addNewMeal() {
  var newMealToAdd = {name: nameOfMeal.value, calories: calories.value , date: date.value};
  nameOfMeal.value = '';
  calories.value = '';
  date.value = '';
  xhrRequest('POST', url, JSON.stringify(newMealToAdd), function(response) {
    var data = JSON.parse(response);
    createAnElement(data.id, data.name, data.calories, data.date);
  })
}


getMeals();
addButton.addEventListener('click', addNewMeal);
nowButton.addEventListener('click', fillDate);
