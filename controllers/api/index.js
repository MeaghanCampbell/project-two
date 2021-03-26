const router = require('express').Router();

const userRoutes = require('./user-routes');
const sessionRoutes = require('./session-routes')
const benchmarkRoutes = require('./benchmark-routes')
const followRoutes = require('./follow-routes')

router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes)
router.use('/benchmarks', benchmarkRoutes)
router.use('/follows', followRoutes)

module.exports = router;