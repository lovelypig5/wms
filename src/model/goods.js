var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize'),
    User = require('./user'),
    R_User_Goods = require('./r_user_goods'),
    Attrs = require('./attrs'),
    Attr = require('./attr'),
    Records = require('./records');

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

Goods.hasMany(Attrs);
Goods.hasMany(Attr);
Goods.hasMany(Records);
Goods.belongsToMany(User, {
    through: R_User_Goods,
    foreignKey: 'goods_id',
    otherKey: 'user_id'
});

module.exports = Goods;
