const router = require('express').Router()
const { Benchmark, User, Workout, Saved } = require('../../models')

router.get('/', (req, res) => {
    Save.findAll({
        attributes: ['id', 'loggedin_user_id', 'followed_user_id']
    })
    .then(dbSaveData => res.json(dbSaveData))
    .catch(err => {
        console.log(err)
        res.status(500).json
    })
})

// post a follower
router.post('/', (req, res) => {
    Save.create({
        save_user_id: req.body.user_id,
        where: {
            // this is where req.session.user_id
            logged_in_user: 3
        }
    })
    .then(dbSaveData => res.json(dbSaveData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router