const router = require('express').Router();

const userRoutes = require('./user-routes');
const workoutRoutes = require('./workout-routes')
const benchmarkRoutes = require('./benchmark-routes')
const followRoutes = require('./follow-routes')

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes)
router.use('/benchmarks', benchmarkRoutes)
router.use('/follows', followRoutes)

module.exports = router;