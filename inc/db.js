const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
 host: '162.214.51.109',
  user: 'bmcpanel_root',
  database: 'bmcpanel_restaurante',
  password: 'Soad12061998*', 
});

module.exports = connection;