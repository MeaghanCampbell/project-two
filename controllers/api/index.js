const router = require('express').Router();

const userRoutes = require('./user-routes');
const workoutRoutes = require('./workout-routes')
const benchmarkRoutes = require('./benchmark-routes')
const followRoutes = require('./follow-routes')
const searchRoutes = require('./search-routes')
const savedWorkoutsRoutes = require('./saved-workouts-routes')

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes)
router.use('/benchmarks', benchmarkRoutes)
router.use('/follows', followRoutes)
router.use('/searches', searchRoutes)
router.use('/saved-workouts', savedWorkoutsRoutes)

module.exports = router;
