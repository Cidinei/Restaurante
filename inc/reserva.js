var conn = require('./db');

module.exports = {

  render(req, res, error) {
    res.render('reserva', {
      title: 'Reservas - Boteco Do Mosquito',
      banner: '',
      h1: 'Reserve aqui',
      body: req.body,
      error,
      success
    });
  },

  save(fields) {

    return new Promise((resolve, reject) => {

      conn.query(`
      INSERT INTO tb_reserva (name, email, people, date, time, phone)
      VALUES(?,?,?,?,?,?)
      `, [
        fields.name,
        fields.email,
        fields.people,
        fields.date,
        fields.time,
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