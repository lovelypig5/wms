var User = require('./user'),
    Good = require('./good'),
    GoodSub = require('./goodsub'),
    Attr = require('./attr'),
    Record = require('./record'),
    Order = require('./order'),

    V_Attr = require('./v_attr');

// Good.hasMany(Attrs, {
//     foreignKey: 'good_id',
// });
// Good.hasMany(Attr);
// Good.hasMany(Record);
User.hasMany(Good, {
    foreignKey: 'user_id'
});
//
Good.belongsTo(User);
Good.hasMany(GoodSub);
Good.belongsToMany(Attr, {
    through: 'r_good_attr',
    foreignKey: 'good_id',
    otherKey: 'attr_id',
    timestamps: false
});
// Good.hasMany(Attrs, {
//     foreignKey: 'good_id'
// });

GoodSub.belongsTo(Good, {
    foreignKey: 'good_id'
});
GoodSub.belongsToMany(Attr, {
    through: 'r_goodsub_attr',
    foreignKey: 'goodsub_id',
    otherKey: 'attr_id',
    timestamps: false
});
GoodSub.hasOne(V_Attr, {
    foreignKey: 'goodsub_id'
});

Attr.belongsToMany(Good, {
    through: 'r_good_attr',
    foreignKey: 'attr_id',
    otherKey: 'good_id',
    timestamps: false
});

// Attrs.belongsTo(Good, {
//     foreignKey: 'good_id',
// });

Record.belongsTo(Good, {
    foreignKey: 'good_id',
});
Record.belongsTo(Order, {
    foreignKey: 'order_id',
});
Record.belongsToMany(Attr, {
    through: 'r_record_attr',
    foreignKey: 'record_id',
    otherKey: 'attr_id',
    timestamps: false
});

module.exports = {
    User: User,
    Good: Good,
    GoodSub: GoodSub,
    Attr: Attr,
    Record: Record,
    Order: Order,

    V_Attr: V_Attr
};
