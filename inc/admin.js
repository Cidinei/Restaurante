var conn = require('./db');

module.exports = {

  dashboard() {
    return new Promise((resolve, reject) => {
      conn.query(`
      SELECT
	  (SELECT COUNT(*) FROM tb_comentarios) AS nrcomments,
    (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
    (SELECT COUNT(*) FROM tb_emails) AS nremails,
    (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
    (SELECT COUNT(*) FROM tb_reservas) AS nrreservas,
    (SELECT COUNT(*) FROM tb_parceiros) AS nrparceiros,
    (SELECT COUNT(*) FROM tb_users) AS nrusers;
      `, (err, results) => {

        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });

    });

  },


  getParams(req, params) {
    return Object.assign({}, {
      title: 'ADMIN - CPANEL',
      h1: 'ADM - CPANEL',
      menus: req.menus,
      user: req.session.user,
    }, params);
  },

  getMenus(req) {

    let menus = [
      {
        text: "Tela Inicial",
        href: "/admin/",
        icon: "home",
        active: false,
      },
      {
        text: "Menus",
        href: "/admin/menus",
        icon: "cutlery",
        active: false,
      },
      {
        text: "Reservas",
        href: "/admin/reservations",
        icon: "calendar-check-o",
        active: false,
      },
      {
        text: "Contatos",
        href: "/admin/contacts",
        icon: "comments",
        active: false,
      },
      {
        text: "E-mails",
        href: "/admin/emails",
        icon: "envelope",
        active: false,
      },
      {
        text: "Parceiros",
        href: "/admin/parceiros",
        icon: "briefcase",
        active: false,
      },

      {
        text: "Usuários",
        href: "/admin/users",
        icon: "users",
        active: false,
      },
      {
        text: "Comentários",
        href: "/admin/comments",
        icon: "star",
        active: false,
      }

    ];

    menus.map(menu => {
      if (menu.href === `/admin${req.url}`) menu.active = true;
    });
    return menus;

  }

};