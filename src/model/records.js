var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Records = sequelize.define('records', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    goods_attr: {
        type: Sequelize.STRING
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
    tableName: 'goods_records',
    timestamps: false
});

module.exports = Records;
