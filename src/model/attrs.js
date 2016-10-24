var Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

var Attrs = sequelize.define('attrs', {
    attr: {
        type: Sequelize.STRING(45)
    },
    count: {
        type: Sequelize.INTEGER(11)
    }
}, {
    freezeTableName: true,
    tableName: 'goods_attrs'
});

module.exports = Attrs;
