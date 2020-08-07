var conn = require('./db');

module.exports = {
  render(req, res, error) {
    res.render("admin/login", {
     body:  req.body,
     title:'Area Restrita',
     error
    });


  },

  login(email, password) {
    return new Promise((resolve, reject) => {
      conn.query(`
      SELECT * FROM bmcpanel_restaurante.tb_users WHERE email = ?
         `, [
        email
      ], (err, results) => {
        if (err) {
          reject(err);
        } else {

          if (!results.length > 0) {
            reject("Usuário ou Senha Incorretos.");
          } else {

            let row = results[0];

            if (row.password !== password) {
              reject("Senha Incorretos.");
            } else {

            }
            resolve(row);
          }

        }

      });
    })

  }


};