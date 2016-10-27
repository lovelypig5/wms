var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var GoodSub = sequelize.define('goodsub', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    count: {
        type: Sequelize.INTEGER(11)
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = GoodSub;
