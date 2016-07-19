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

module.exports = Meals;
