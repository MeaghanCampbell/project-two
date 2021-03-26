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

User.belongsToMany(Session, {
    through: Like,
    as: 'liked_sessions',
    foreignKey: 'user_id'
})

Session.belongsToMany(User, {
    through: Like,
    as: 'liked_sessions',
    foreignKey: 'session_id'
})

Like.belongsTo(User, {
    foreignKey: 'user_id'
})

Like.belongsTo(Session, {
    foreignKey: 'session_id'
})

User.hasMany(Like, {
    foreignKey: 'user_id'
})

Session.hasMany(Like, {
    foreignKey: 'session_id'
})

// follow associations - not complete
User.hasMany(Follow, {
    foreignKey: 'user_id'
})

Follow.belongsTo(User, {
    foreignKey: 'user_id' 
})

module.exports = { User, Session, Benchmark, Follow, Like };