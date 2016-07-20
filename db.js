var Meals = (function (con) {

  function errorHandler(err) {
    if(err) {
      console.log(err.toString());
      return;
    }
  }

  function publicAddMeal (meal, cb) {
    con.query('INSERT INTO meals SET ?', meal, function(err,row){
      errorHandler(err);
      if (row.affectedRows === 1) {
        cb({"status": "ok"});
      } else {
        cb(row);
      }
    });
  }

  function publicGetMeal (req, cb) {
    con.query('SELECT * FROM meals;',function(err,rows){
      errorHandler(err);
      cb(rows);
    });
  }

  function publicDelMeal (id, cb) {
    con.query('DELETE FROM meals WHERE id = ?', id, function(err,row){
      errorHandler(err);
      if (row.affectedRows === 1) {
        cb({"status": "ok"});
      } else {
        cb({"status": "not exists"});
      }
    });
  }

  function publicFilterMeals (date, cb) {
    con.query('SELECT * FROM meals WHERE meals.date LIKE ' + '"' + date + '%' + '";',function(err,rows){
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
