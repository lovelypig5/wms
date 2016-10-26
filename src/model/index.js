var User = require('./user'),
    Goods = require('./goods'),
    Attrs = require('./attrs'),
    Attr = require('./attr'),
    Records = require('./records');

// Goods.hasMany(Attrs, {
//     foreignKey: 'goods_id',
// });
// Goods.hasMany(Attr);
// Goods.hasMany(Records);
// User.belongsToMany(Goods, {
//     through: 'r_user_goods',
//     foreignKey: 'user_id',
//     otherKey: 'goods_id',
//     timestamps: false
// });
// 
Goods.belongsToMany(User, {
    through: 'r_user_goods',
    foreignKey: 'goods_id',
    otherKey: 'user_id',
    timestamps: false
});
Goods.hasMany(Attrs, {
    foreignKey: 'goods_id'
});

Attr.belongsTo(Goods, {
    foreignKey: 'goods_id',
});

Attrs.belongsTo(Goods, {
    foreignKey: 'goods_id',
});

Records.belongsTo(Goods, {
    foreignKey: 'goods_id',
});
Records.hasOne(Attrs, {
    foreignKey: 'attr',
});

module.exports = {
    User: User,
    Goods: Goods,
    Attrs: Attrs,
    Attr: Attr,
    Records: Records
};
