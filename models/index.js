const User = require('./User');
const Session = require('./Session');
const Benchmark = require('./Benchmark');
const Follow = require('./Follow')

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

User.hasMany(Follow, {
    foreignKey: 'user_id'
})

Follow.belongsTo(User, {
    foreignKey: 'user_id' 
})

module.exports = { User, Session, Benchmark, Follow };