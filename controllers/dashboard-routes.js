const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Workout, Benchmark, Kudos, Follow } = require('../models')

// main dashboard view

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
                attributes: ['username'],
                include: {
                    model: Benchmark,
                    attributes: ['boulder_grade', 'route_grade', 'user_id']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWorkoutData => {
        const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }));
        res.render('dashboard', { workouts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router