const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kudos extends Model {}

Kudos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'session',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'kudos'
    }
)

module.exports = Kudos
