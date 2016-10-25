var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Goods = sequelize.define('goods', {
    id: {
        type: Sequelize.INTEGER(11),
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

module.exports = Goods;
