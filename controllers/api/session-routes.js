const router = require('express').Router()
const { Session, User } = require('../../models')

// get all sessions
router.get('/', (req, res) => {
    Session.findAll({
      attributes: ['id', 'date', 'category', 'time', 'level', 'description'],
      order: [['date', 'DESC']], 
      include: [
          {
              model: User,
              attributes: ['username']
          }
      ]
    })
    .then(dbSessionData => res.json(dbSessionData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// get one session by id
router.get('/:id', (req, res) => {
    Session.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'date', 'category', 'time', 'level', 'description'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbSessionData => {
        if (!dbSessionData) {
            res.status(404).json({ message: 'No session found with this id' });
            return;
        }
        res.json(dbSessionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// post a new session
router.post('/', (req, res) => {
    Session.create({
        date: req.body.date,
        category: req.body.category,
        time: req.body.time,
        level: req.body.level,
        description: req.body.description,
        user_id: req.body.user_id
    })
    .then(dbSessionData => res.json(dbSessionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// update a session by id
router.put('/:id', (req, res) => {
    Session.update(
        {
            category: req.body.category,
            time: req.body.time,
            level: req.body.level,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbSessionData => {
        if (!dbSessionData) {
            res.status(404).json({ message: 'No session found with this id' });
            return;
        }
    res.json(dbSessionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// delete a session
router.delete('/:id', (req, res) => {
    Session.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbSessionData => {
        if (!dbSessionData) {
          res.status(404).json({ message: 'No session found with this id' });
          return;
        }
    res.json(dbSessionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router