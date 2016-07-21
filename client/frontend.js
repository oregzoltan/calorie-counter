'use strict';

var frontEnd = (function () {

  var nameOfMeal = document.querySelector('#nameOfMeal');
  var calories = document.querySelector('#calories');
  var date = document.querySelector('#date');
  var mealList = document.querySelector('.mealList');
  var filterDate = document.querySelector('#filterDate');
  var sum = document.querySelector('.sum');
  var url = 'http://localhost:3000/meals';
  var sumOfCal = 0;

  function init() {
    var addButton = document.querySelector('.addButton');
    var nowButton = document.querySelector('.nowButton');
    var filterButton = document.querySelector('.filterButton');
    var showAllButton = document.querySelector('.showAllButton');
    addButton.addEventListener('click', frontEnd.addNewMeal);
    nowButton.addEventListener('click', frontEnd.fillDate);
    filterButton.addEventListener('click', frontEnd.filterByDate);
    showAllButton.addEventListener('click', frontEnd.refreshList);
    frontEnd.getMeals();
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

  function formatDate(date) {
    return (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + '-' + date.getMinutes());
  }

  function fillDate() {
    date.value = formatDate(new Date());
  }

  function refreshList() {
    mealList.innerHTML='';
    getMeals();
  }

  function createAnElement(id, name, calories, date) {
    var newMeal = document.createElement('li');
    var delButton = document.createElement('button');
    delButton.classList.add('delButton');
    delButton.setAttribute('value', id);
    delButton.addEventListener('click', delMeal);
    newMeal.classList.add('meal');
    newMeal.textContent = name + ' ' + calories + ' ' + formatDate(new Date(date));
    newMeal.appendChild(delButton);
    newMeal.setAttribute('id', id);
    mealList.appendChild(newMeal);
  }

  function setSum(data) {
    sumOfCal = data.reduce(function(result, item) {return result + item.calories;}, 0);
    sum.textContent = 'Sum of calories: ' + sumOfCal;
  }

  function getMeals() {
    xhrRequest('GET', url, '', function(response) {
      var data = JSON.parse(response);
      data = data.meals;
      setSum(data);
      data.forEach(function (e) {
        createAnElement(e.id, e.name, e.calories, e.date);
      })
    })
  }

  function addNewMeal() {
    var newMealToAdd = {name: nameOfMeal.value, calories: calories.value , date: date.value};
    nameOfMeal.value = '';
    calories.value = '';
    date.value = '';
    xhrRequest('POST', url, JSON.stringify(newMealToAdd), function(response) {
      refreshList();
    })
  }

  function filterByDate() {
    xhrRequest('GET', url + '?date=' + filterDate.value, '', function(response) {
      var data = JSON.parse(response);
      setSum(data);
      mealList.innerHTML='';
      filterDate.value = '';
      data.forEach(function (e) {
        createAnElement(e.id, e.name, e.calories, e.date);
      })
    })
  }

  function delMeal(event) {
    var id = event.target.getAttribute('value');
    xhrRequest('DELETE', url + '/' + id, '', function(response) {
      mealList.removeChild(document.getElementById(id));
      sum.textContent = 'Sum of calories: ' + sumOfCal;
    })
  }

  return {
    init: init,
    getMeals: getMeals,
    addNewMeal: addNewMeal,
    fillDate: fillDate,
    filterByDate: filterByDate,
    refreshList: refreshList
  }
})();

frontEnd.init();
