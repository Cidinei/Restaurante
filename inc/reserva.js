var conn = require('./db');

module.exports = {

  render(req, res, error, success) {
    res.render('reserva', {
      title: 'Reservas - Boteco Do Mosquito',
      banner: 'images/img_bg_2.jpg',
      h1: 'Reserve aqui',
      body: req.body,
      error,
      success
    });
  },

  save(fields) {

    return new Promise((resolve, reject) => {

      let date = fields.date.split('/');
      fields.date = `${date[2]}-${date[1]}-${date[0]}`;

      conn.query(`
      INSERT INTO tb_reservas (name, email, people, date, phone)
      VALUES(?,?,?,?,?)
      `, [
        fields.name,
        fields.email,
        fields.people,
        fields.date,
        fields.phone,
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