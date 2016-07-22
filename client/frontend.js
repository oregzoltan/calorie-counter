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
    addButton.addEventListener('click', addNewMeal);
    nowButton.addEventListener('click', fillDate);
    filterButton.addEventListener('click', filterByDate);
    showAllButton.addEventListener('click', refreshList);
    getMeals();
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

  function createAnElement(item) {
    var newMeal = document.createElement('li');
    var newName = document.createElement('div');
    var newCalories = document.createElement('div');
    var newDate = document.createElement('div');
    var delButton = document.createElement('button');
    newName.innerHTML = item.name;
    newCalories.textContent = item.calories;
    newDate.textContent = formatDate(new Date(item.date));
    delButton.classList.add('delButton');
    delButton.setAttribute('value', item.id);
    delButton.addEventListener('click', delMeal);
    newMeal.classList.add('meal');
    newMeal.setAttribute('id', item.id);
    newMeal.setAttribute('value', item.calories);
    newMeal.appendChild(newName);
    newMeal.appendChild(newCalories);
    newMeal.appendChild(newDate);
    newMeal.appendChild(delButton);
    mealList.appendChild(newMeal);
  }

  function setSum(data) {
    sum.textContent = 'Sum of calories: ' + calculateSum(data);;
  }

  function calculateSum(data) {
    sumOfCal = data.reduce(function(result, item) {return result + item.calories;}, 0);
    return (sumOfCal);
  }

  function getMeals() {
    xhrRequest('GET', url, '', function(response) {
      var data = JSON.parse(response);
      data = data.meals;
      setSum(data);
      data.forEach(createAnElement);
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
      data.forEach(createAnElement);
    })
  }

  function delMeal(event) {
    var confWindow = confirm('Are you sure you want to delete this meal?');
    if (confWindow) {
      var id = event.target.getAttribute('value');
      xhrRequest('DELETE', url + '/' + id, '', function(response) {
        sumOfCal -= parseInt(document.getElementById(id).getAttribute('value'));
        sum.textContent = 'Sum of calories: ' + sumOfCal;
        mealList.removeChild(document.getElementById(id));
      })
    }
  }

  return {
    init: init
  }
})();

frontEnd.init();
