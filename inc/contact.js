var conn = require('./db');

module.exports = {

  render(req, res, error, success) {
    res.render('contact', {
      title: 'Contato - Boteco Do Mosquito',
      banner: 'images/img_bg_3.jpg',
      icone: 'restaurante.ico',
      h1: 'Diga um oi!',
      body: req.body,
      error,
      success
    });
  },

  save(fields) {

    return new Promise((resolve, reject) => {

      conn.query(`
      INSERT INTO tb_contacts (name, email, phone, message)
      VALUES(?,?,?,?)
      `, [
        fields.name,
        fields.email,
        fields.phone,
        fields.message,
      ], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }

      });

    });
  }
};