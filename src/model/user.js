var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = User;
