var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Order = sequelize.define('order', {
    id: {
        type: Sequelize.UUID,
        autoIncrement: true,
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
    },
    user_id: {
        type: Sequelize.INTEGER(11)
    }
}, {
    freezeTableName: true,
    underscored: true,
    tableName: 'order',
    timestamps: false
});

module.exports = Order;
