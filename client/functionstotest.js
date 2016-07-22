function calculateSum(data) {
  sumOfCal = data.reduce(function(result, item) {return result + item.calories;}, 0);
  return (sumOfCal);
}

function formatDate(date) {
  return (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + '-' + date.getMinutes());
}
module.exports = {};
module.exports.calculateSum = calculateSum;
module.exports.formatDate = formatDate;
