const User = require('./User');
const Session = require('./Session');
const Benchmark = require('./Benchmark');
const Follow = require('./Follow')
const Like = require('./Like')

User.hasMany(Session, {
    foreignKey: 'user_id'
});

Session.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasOne(Benchmark, {
    foreignKey: 'user_id'
})

Benchmark.belongsTo(User, {
    foreignKey: 'user_id'
})

// User can follow many accounts
User.hasMany(Follow, {
    foreignKey: 'user_id'
})

// follow belongs to a user
Follow.belongsTo(User, {
    foreignKey: 'user_id' 
})

module.exports = { User, Session, Benchmark, Follow, Like };