const router = require('express').Router()
const sequelize = require('../config/connection');
const { User, Workout, Follow } = require('../models');

// saved-workouts route
router.get('/', (req, res) => {
    Workout.findAll({
        where: {
            user_id: req.session.user_id
        },
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
        res.render('saved-workouts', { 
            workouts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
    }
);

// view single workout
router.get('/workout/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.render('login')
    } else {
    Workout.findOne({
        where: {
            id: req.params.id
        },
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
        if (!dbWorkoutData) {
            res.status(404).json({ message: 'No workout found with this id' })
            return
        }

        const workout = dbWorkoutData.get({ plain: true });

        res.render('single-workout', { 
            workout,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
    }
})
module.exports = router
