const router = require('express').Router()
const { Session, User, Kudos } = require('../../models')
const sequelize = require('../../config/connection');

// get all sessions
router.get('/', (req, res) => {
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


// route for updating posts with a kudos
router.put('/kudos', (req, res) => {
    Kudos.create({
        user_id: req.body.user_id,
        session_id: req.body.session_id
      }).then(() => {
        // then find the post we just voted on
        return Session.findOne({
          where: {
            id: req.body.session_id
          },
          attributes: [
            'id',
            'date',
            'category',
            'time',
            'level',
            'description',
            [
                sequelize.literal('(SELECT COUNT(*) FROM kudos WHERE session.id = kudos.session_id)'),
                'kudos_count'
            ]
          ]
        })
        .then(dbSessionData => res.json(dbSessionData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    })
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