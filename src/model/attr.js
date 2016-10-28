var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');

var Attr = sequelize.define('attr', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    attr: {
        type: Sequelize.STRING(45)
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

module.exports = Attr;
