var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize'),
    Records = require('./records');

var Order = sequelize.define('order', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    expressId: {
        type: Sequelize.BIGINT(63)
    },
    expressCost: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING(45)
    },
    comment: {
        type: Sequelize.STRING(1000)
    },
    price: {
        type: Sequelize.DOUBLE
    },
    expressDate: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    tableName: 'order'
});

// Order.hasMany(Records);

module.exports = Order;
