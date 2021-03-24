const User = require('./User');
const Session = require('./Session');
const Benchmark = require('./Benchmark');

User.hasMany(Session, {
    foreignKey: 'user_id'
});

Session.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Session, Benchmark };