var User = require('./user'),
    Good = require('./good'),
    GoodSub = require('./goodsub'),
    Attr = require('./attr'),
    Record = require('./record');

// Good.hasMany(Attrs, {
//     foreignKey: 'good_id',
// });
// Good.hasMany(Attr);
// Good.hasMany(Record);
// User.belongsToMany(Good, {
//     through: 'r_user_goods',
//     foreignKey: 'user_id',
//     otherKey: 'good_id',
//     timestamps: false
// });
//
Good.belongsTo(User);
Good.hasMany(GoodSub);
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
    Record: Record
};
