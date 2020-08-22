let conn = require('./db');

module.exports = {
  getParceiros() {
    return new Promise((resolve, reject) => {

      conn.query(`
       SELECT * FROM bmcpanel_restaurante.tb_parceiros ORDER BY id
      `, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });

    });
  }
};