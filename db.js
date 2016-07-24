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
      if (row !== undefined && row.affectedRows === 1) {
        cb({"status": "ok", "meal": {"id": row.insertId, "name": meal.name, "calories": meal.calories, "date": meal.date}});
      } else {
        cb(row);
      }
    });
  }

  function publicGetMeal (cb) {
    con.query('SELECT * FROM meals;',function(err,rows){
      errorHandler(err);
      cb({"meals":rows});
    });
  }

  function publicDelMeal (id, cb) {
    con.query('DELETE FROM meals WHERE id = ?', id, function(err,row){
      errorHandler(err);
      if (row.affectedRows === 1) {
        cb({"status": "ok", "meal": {"id": id}});
      } else {
        cb({"status": "not exists"});
      }
    });
  }

  function publicFilterMeals (date, cb) {
    con.query('SELECT * FROM meals WHERE meals.date LIKE ' + '"' + date + '%' + '";', function(err,rows){
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
