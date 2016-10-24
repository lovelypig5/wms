var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize'),
    Goods = require('./goods'),
    Order = require('./order'),
    Records = require('./records'),
    R_User_Goods = require('./r_user_goods');

var User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

User.belongsToMany(R_User_Goods, {
    through: R_User_Goods,
    foreignKey: 'user_id',
    otherKey: 'goods_id'
});

User.hasMany(Records);
User.hasMany(Order);

module.exports = User;
