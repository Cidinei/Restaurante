var conn = require('../inc/db')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  conn.query("Select  * FROM tb_users ORDER BY name", (err, results) => {

    if (err){
      res.send(err);
    } else{
      res.send(results);
    }

  })//;res.send('respond with a resource');
  
});

module.exports = router;
