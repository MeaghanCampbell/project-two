const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        category: 'Bouldering',
        time: 60,
        level: 'Advanced',
        date: '03/20/21',
        description: 'Here is the workout description!',
        kudos_count: 10,
        user: {
        username: 'test_user'
    }
    })
})

module.exports = router