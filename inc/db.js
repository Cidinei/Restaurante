const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'restaurante',
  password: 'Soad12061998*',
});

module.exports = connection;