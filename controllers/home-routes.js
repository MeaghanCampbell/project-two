const router = require('express').Router()
const sequelize = require('../config/connection');
const { User, Workout, Benchmark, Kudos, Follow } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session.loggedIn)
    if (!req.session.loggedIn) {
        res.render('login')
    } else {
    Workout.findAll({
        attributes: [
            'id',
            'date',
            'category',
            'time',
            'level',
            'description',
            [sequelize.literal('(SELECT COUNT(*) FROM kudos WHERE workout.id = kudos.workout_id)'), 'kudos_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWorkoutData => {
        const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }))
        res.render('homepage', { 
            workouts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
    }
})

// routing to signup in views > signup.handlebars

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