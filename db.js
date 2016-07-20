var Meals = (function (con) {

  function errorHandler(err) {
    if(err) {
      console.log(err.toString());
      return;
    }
  }

  function publicAddMeal (req, cb) {
    con.query('INSERT INTO meals SET ?', { name: req.body.name, calories: req.body.calories, date: req.body.date}, function(err,row){
      errorHandler(err);
      cb(row);
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

  function publicFilterMeals (req, cb) {
    con.query('SELECT * FROM meals WHERE meals.date LIKE ' + '"' + req.params.filter + '%' + '";',function(err,rows){
      errorHandler(err);
      cb(rows);
    });
  }

  return {
    addMeal: publicAddMeal,
    getMeal: publicGetMeal,
    delMeal: publicDelMeal,
    filterMeals: publicFilterMeals
  };
});

module.exports = Meals;
