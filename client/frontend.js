'use strict';
var nameOfMeal = document.querySelector('#nameOfMeal');
var calories = document.querySelector('#calories');
var date = document.querySelector('#date');
var addButton = document.querySelector('.addButton');
var nowButton = document.querySelector('.nowButton');
var mealList = document.querySelector('.mealList');

var url = 'http://localhost:3000/meals';

function createAnElement(id, name, calories, date) {
  var newMeal = document.createElement('li');
  newMeal.classList.add("meal");
  newMeal.textContent = name + ' ' + calories + ' ' + date;
  newMeal.setAttribute('id', id);
  mealList.appendChild(newMeal);
}

function fillDate() {
  date.value = Date();
  console.log(Date());
}
//
// function createButtons(id) {
//   document.getElementById('d'+id).addEventListener('click', delTodo);
//   document.getElementById('chk'+id).addEventListener('click', chkTodo);
//   document.getElementById('yod'+id).addEventListener('click', yodaTodo);
//   document.getElementById('chk'+id).classList.add('unchecked');
// }

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
    // var data = JSON.parse(response);
    // createAnElement(data.id, data.text);
  })
}

// function delTodo(event) {
//   var id = event.target.getAttribute('id').slice(1);
//   xhrRequest('DELETE', url + '/' + id, '', function(response) {
//     divContainer.removeChild(document.getElementById('di'+id));
//   })
// }

// function chkTodo(event) {
//   var id = event.target.getAttribute('id').slice(3);
//   var toSend = {
//     text: document.querySelector('#di'+id + ' div').textContent,
//     completed: !document.getElementById('chk'+id).classList.contains('checked')
//   };
//   xhrRequest('PUT', url + '/' + id, JSON.stringify(toSend), function(response) {
//     document.getElementById('chk'+id).classList.toggle('checked');
//   })
// }




getMeals();
addButton.addEventListener('click', addNewMeal);
nowButton.addEventListener('click', fillDate);
