var menus = require('./../inc/cardapio');
var express = require('express');
var router = express.Router();
var reserva = require('./../inc/reserva');

/* GET home page. */
router.get('/', function (req, res, next) {

  menus.getMenus().then(results => {
    res.render('index', {
      title: 'Boteco Do Mosquito',
      menus: results,                  
      banner: 'images/img_bg_1.jpg',
      h1: 'Restaurante Saboroso!',
      isHome: true,
    });

  }); 

});

/* GET Contatos page */
router.get('/contact', function (req, res, next) {

  res.render('contact', {
    title: 'Contato - Boteco Do Mosquito',
    banner: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!'
  });
});

/* GET Cardapio page  */
router.get('/menus', function (req, res, next) {

  menus.getMenus().then(results => {
    res.render('menu', {
      title: 'Nosso Menu',
      menus: results,
      banner: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!'
    });
  });
});

/* GET Reserva page */
router.get('/reserva', function (req, res, next) {

  reserva.render(req, res);

});

router.post('/reserva', function (req, res, next) {

  if (!req.body.name) {
    reserva.render(req, res, "Digite o nome");
  } else if (!req.body.email) {
    reserva.render(req, res, "Digite seu e-mail");
  } else if (!req.body.people) {
    reserva.render(req, res, "Digite numero de pessoas");
  } else if (!req.body.date) {
    reserva.render(req, res, "Digite uma data");
  } else if (!req.body.time) {
    reserva.render(req, res, "EscolHorario");
  } else if (!req.body.phone) {
    reserva.render(req, res, "Seu Telefone");
  } else {

    reserva.save(req.body).then(results => {

      req.body = {};

      reserva.render(req, res, null, "Reserva realizada com sucesso!");
    }).catch(err => {

      reserva.render(req, res, err.message);

    });
  }
});

/* GET Serviços page */
router.get('/services', function (req, res, next) {

  res.render('services', {
    title: 'Nossos Serviços',
    banner: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });
});

module.exports = router;
