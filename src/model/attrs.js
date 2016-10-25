var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Attrs = sequelize.define('attrs', {
    attr: {
        type: Sequelize.STRING(45)
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
