var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Record = sequelize.define('record', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    price: {
        type: Sequelize.DOUBLE
    },
    amount: {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Record;
