var Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

var Attr = sequelize.define('attrs', {
    user_id: {
        type: Sequelize.INTEGER(11)
    },
    attr: {
        type: Sequelize.STRING(45)
    }
}, {
    freezeTableName: true,
    tableName: 'r_user_goods_attr'
});

module.exports = Attr;
