const User = require('./User');
const Session = require('./Session');
const Benchmark = require('./Benchmark');
const Follow = require('./Follow')
const Kudos = require('./Kudos')

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
    through: Kudos,
    as: 'kudos_sessions',
    foreignKey: 'user_id'
})

Session.belongsToMany(User, {
    through: Kudos,
    as: 'kudos_sessions',
    foreignKey: 'session_id'
})

Kudos.belongsTo(User, {
    foreignKey: 'user_id'
})

Kudos.belongsTo(Session, {
    foreignKey: 'session_id'
})

User.hasMany(Kudos, {
    foreignKey: 'user_id'
})

Session.hasMany(Kudos, {
    foreignKey: 'session_id'
})

// follow associations - not complete
User.hasMany(Follow, {
    foreignKey: 'user_id'
})

Follow.belongsTo(User, {
    foreignKey: 'user_id' 
})

module.exports = { User, Session, Benchmark, Follow, Kudos };