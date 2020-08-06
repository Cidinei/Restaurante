let conn = require('./db');

module.exports = {
  getMenus() {
    return new Promise((resolve, reject) => {

      conn.query(`
       SELECT * FRON tb_menus ORDER BY title
      `, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });

    });
  }
};