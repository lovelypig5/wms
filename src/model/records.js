var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Records = sequelize.define('records', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    attr: {
        type: Sequelize.STRING
    },
    count: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    tableName: 'goods_records'
});

module.exports = Records;
