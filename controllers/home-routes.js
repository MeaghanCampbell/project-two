const router = require('express').Router()
const sequelize = require('../config/connection');
const { User, Session, Benchmark, Kudos, Follow } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session)
    Session.findAll({
        attributes: [
            'id',
            'date',
            'category',
            'time',
            'level',
            'description',
            [sequelize.literal('(SELECT COUNT(*) FROM kudos WHERE session.id = kudos.session_id)'), 'kudos_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbSessionData => {
        const sessions = dbSessionData.map(session => session.get({ plain: true }))
        res.render('homepage', { sessions })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  

module.exports = router