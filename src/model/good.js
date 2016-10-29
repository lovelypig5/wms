var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Good = sequelize.define('good', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100)
    },
    count: {
        type: Sequelize.INTEGER(11)
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = Good;
