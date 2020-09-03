var express = require("express");
var router = express.Router();
var menus = require("./../inc/cardapio");
var users = require("./../inc/users");
var admin = require("./../inc/admin");

router.use(function (req, res, next) {
  if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
    res.redirect("/admin/login");
  } else {
    next();
  }
});

router.use(function (req, res, next) {
  req.menus = admin.getMenus(req);
  next();
});

router.get('/logout', function (req, res, next) {
  delete req.session.user;
  res.redirect("/admin/login");
});

router.get('/login', function (req, res, next) {
  users.render(req, res, null);
});

router.post('/login', function (req, res, next) {
  if (!req.body.email) {
    users.render(req, res, "Preencha o Campo E-mail.");
  } else if (!req.body.password) {
    users.render(req, res, "Preencha o Campo E-mail.");
  } else {
    users.login(req.body.email, req.body.password).then(user => {
      req.session.user = user;

      res.redirect("/admin");

    }).catch(err => {
      users.render(req, res, err.message || err);

    });
  }

});

router.get('/', function (req, res, next) {
  admin.dashboard().then(data => {
    res.render("admin/index", admin.getParams(req, {
      pag: "Tela Inicial",
      data
    }));

  }).catch(err => {
    console.error(err);
  });

});

router.get('/contacts', function (req, res, next) {
  res.render("admin/contacts", admin.getParams(req, {
    pag: "Contatos",
  }));

});

router.post('/menus', function (req, res, next) {

  menus.save(req.fields, req.files).then(results => {
    res.send(results);
  }).catch(err => {
    res.send(err);
  });

});


router.get('/menus', function (req, res, next) {

  menus.getMenus().then(data => {

    res.render("admin/menus", admin.getParams(req, {
      pag: "Menus",
      data
    }));

  });

});

router.get('/emails', function (req, res, next) {
  res.render("admin/emails", admin.getParams(req, {
    pag: "E-mails",
  }));

});

router.get('/users', function (req, res, next) {
  res.render("admin/users", admin.getParams(req, {
    pag: "Usuários",
  }));

});
router.get('/parceiros', function (req, res, next) {
  res.render("admin/parceiros", admin.getParams(req, {
    pag: "Parceiros",
  }));

});

router.get('/reservations', function (req, res, next) {
  res.render("admin/reservations", admin.getParams(req, {
    pag: "Tela Inicial",
    date: {},
  }));

});

router.get('/comments', function (req, res, next) {
  res.render("admin/comments", admin.getParams(req, {
    pag: "Comentários",
  }));

});

module.exports = router;