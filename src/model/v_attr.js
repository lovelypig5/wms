var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var V_Attr = sequelize.define('v_attr', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    attr_id: {
        type: Sequelize.INTEGER(11)
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    tableName: 'v_goodsub_attr'
});

module.exports = V_Attr;
