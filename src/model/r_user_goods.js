var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var R_User_Goods = sequelize.define('r_user_goods', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = R_User_Goods;
