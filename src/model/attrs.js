var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Attrs = sequelize.define('attrs', {
    goods_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    attr: {
        type: Sequelize.STRING(45),
        primaryKey: true
    },
    count: {
        type: Sequelize.INTEGER(11)
    }
}, {
    freezeTableName: true,
    tableName: 'goods_attrs',
    timestamps: false
});
Attrs.removeAttribute('id');

module.exports = Attrs;
