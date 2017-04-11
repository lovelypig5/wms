var Sequelize = require('sequelize');
var BaseDao = require('./baseDao');

var permutations = (arr, num) => {
    var r = [];
    var f = (t, a, n) => {
        if (n === 0) {
            return r.push(t);
        }
        for (var i = 0, l = a.length; i < l; i++) {
            f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
        }
    };
    f([], arr, num);
    return r;
};

class GoodsDao extends BaseDao {

    /**
     * search good according to name
     * @method search
     * @param  {Number} user_id : user id
     * @param  {String} name    : search term
     * @return {Promise}
     */
    async search(user_id, name) {
        var rows = await this.model.Good.findAll({
            limit: 10,
            attributes: ['id', 'name'],
            where: {
                user_id: user_id,
                name: {
                    $like: '%' + name + '%'
                }
            }
        })

        return this.ajaxModel(200, rows);
    }

    /**
     * list goods of given user
     * @method list
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    async list(user_id) {
        var result = await this.model.Good.findAndCountAll({
            where: {
                user_id: user_id
            }
        });

        return this.ajaxModel(200, {
            count: result.count,
            content: result.rows
        });
    }

    /**
     * get goods detail
     * @method detail
     * @param  {Number} id      : good id
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    async detail(id, user_id) {
        var good = await this.model.Good.findOne({
            include: [{
                model: this.model.GoodSub,
                attributes: ['id', 'count'],
                include: [{
                    model: this.model.Attr,
                    attributes: ['attr'],
                    through: {
                        attributes: []
                    }
                }]
            }],
            where: {
                user_id: user_id,
                id: id
            }
        });

        if (good) {
            return this.ajaxModel(200, {
                id: good.id,
                name: good.name,
                total: good.count,
                list: good.goodsubs
            });
        } else {
            throw new this.ERRORS.NotFound('不存在该商品！');
        }
    }

    /**
     * create new good
     * @method create
     * @param  {String} name    : good name
     * @param  {List} attrs     : a list of attr<string>
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    async create(transaction, name, attrs, user_id) {
        var user = await this.model.User.findOne({
            where: {
                id: user_id
            },
            include: [{
                model: this.model.Good,
                required: false,
                where: {
                    name: name
                }
            }]
        });

        if (user.goods.length > 0) {
            throw new this.ERRORS.Exist('商品已经存在！');
        } else {
            var goods = await this.model.Good.create({
                name: name,
                count: 0
            }, {
                transaction: transaction
            });
            await user.addGoods(goods, {
                transaction: transaction
            });
            if (attrs.length > 0) {
                attrs.forEach(async(attr) => {
                    await this.model.Attr.create({
                        user_id: user_id,
                        goods_id: goods.id,
                        attr: attr
                    }, {
                        transaction: transaction
                    });
                });
            }

            return this.ajaxModel(200, goods);
        }
    }

    /**
     * modify a record
     * @method modify
     * @param  {Number} record_id : record id
     * @param  {Number} amount    :
     * @param  {Double} price     :
     * @param  {Number} user_id   : user id
     * @return {Promise}
     */
    async modify(transaction, record_id, amount, price, user_id) {
        var record = await this.model.Record.findOne({
            include: [{
                model: this.model.Good,
                where: {
                    user_id: user_id
                }
            }, {
                model: this.model.Attr
            }],
            where: {
                id: record_id
            }
        });

        if (!record) {
            throw new this.ERRORS.NotFound('没有找到对应的记录！');
        }

        let attrs = record.attrs;
        var diff = (record.amount - amount) * record.type;
        var record = await record.update({
            price: price,
            amount: amount
        }, {
            transaction: transaction
        });
        await this.model.Good.update({
            count: record.good.count + diff
        }, {
            transaction: transaction,
            where: {
                id: record.good_id
            }
        });

        if (attrs.length > 0) {
            var attr_ids = [];
            attrs.forEach((item) => {
                attr_ids.push(item.id);
            });
            var temp = permutations(attr_ids, attr_ids.length);
            var ors = [];
            for (var i = 0; i < temp.length; i++) {
                ors.push({
                    attr_id: temp[i].join(',')
                });
            }

            var goodsub = await this.model.GoodSub.findOne({
                include: [{
                    model: this.model.V_Attr,
                    where: {
                        $or: ors
                    }
                }],
                where: {
                    good_id: record.good_id
                }
            });

            if (!goodsub) {
                throw new this.ERRORS.NotFound('没有找到对应的记录！');
            } else {
                var newcount = diff + goodsub.count;
                if (newcount < 0) {
                    throw new this.ERRORS.NotEnough(
                        `库存不足！剩余库存：${goodsub.count}`);
                }

                await this.model.GoodSub.update({
                    count: newcount
                }, {
                    transaction: transaction,
                    where: {
                        id: goodsub.id
                    }
                });
            }
        }

        return this.ajaxModel(200, '修改成功');
    }

    /**
     * in or out list
     * @method inlist
     * @param  {Number} user_id  : user id
     * @param  {Number} type     : record type 1 or -1
     * @param  {Number} page     : page index , default 1
     * @param  {Number} pageSize : page size , default 20
     * @return {Promise}
     */
    async inlist(user_id, type, page, pageSize) {
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * (page - 1) : 0;

        var count = await this.model.Record.count({
            limit: limit,
            offset: offset,
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d'), 'date'],
                'id', 'good_id', 'amount', 'price'
            ],
            include: [{
                model: this.model.Good,
                where: {
                    user_id: user_id
                }
            }],
            where: {
                type: type
            },
            order: [
                ['date', 'DESC']
            ]
        });

        var rows = await this.model.Record.findAll({
            limit: limit,
            offset: offset,
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d'), 'date'],
                'id', 'good_id', 'amount', 'price'
            ],
            include: [{
                model: this.model.Attr,
                attributes: ['attr'],
                through: {
                    attributes: []
                }
            }, {
                model: this.model.Good,
                where: {
                    user_id: user_id
                }
            }],
            where: {
                type: type
            },
            order: [
                ['date', 'DESC']
            ]
        });

        return this.ajaxModel(200, {
            count: count,
            content: rows
        });
    }

    /**
     * goods sell out
     * @method out
     * @param  {Number} id      : good id
     * @param  {Number} amount  : good amount
     * @param  {Double} price   : good price
     * @param  {String} attr    : combination attr
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    async out(transaction, id, amount, price, attr, user_id, order_id) {
        var good = await this.model.Good.findOne({
            where: {
                user_id: user_id,
                id: id
            }
        });
        if (!good) {
            throw new this.ERRORS.NotFound('没有找到指定的商品！');
        } else {
            if (good.count < amount) {
                throw new this.ERRORS.NotEnough(good.name + '库存不足！');
            } else {
                var attr_ids = [];
                if (attr) {
                    attr_ids = attr.split(',');
                }
                await good.update({
                    count: good.count - amount
                }, {
                    transaction: transaction
                });

                var record = await this.model.Record.create({
                    good_id: id,
                    user_id: user_id,
                    price: price,
                    amount: amount,
                    type: 1,
                    order_id: order_id
                }, {
                    transaction: transaction
                })
                if (attr) {
                    var rows = await this.model.Attr.findAll({
                        where: {
                            id: {
                                $in: attr_ids
                            }
                        }
                    });
                    await record.addAttrs(rows, {
                        transaction: transaction
                    });

                    var temp = permutations(attr_ids, attr_ids.length);
                    var ors = [];
                    for (var i = 0; i < temp.length; i++) {
                        ors.push({
                            attr_id: temp[i].join(',')
                        });
                    }
                    var goodsub = await this.model.GoodSub.findOne({
                        include: {
                            model: this.model.V_Attr,
                            where: {
                                $or: ors
                            }
                        },
                        where: {
                            good_id: id
                        }
                    });
                    if (!goodsub) {
                        throw new this.ERRORS.NotFound(`不存在该商品属性:${attr}`);
                    } else {
                        if (goodsub.count < amount) {
                            throw new this.ERRORS.NotEnough(`商品${attr}库存不足`);
                        } else {
                            await goodsub.update({
                                count: goodsub.count - amount
                            }, {
                                transaction: transaction
                            });
                        }
                    }
                }

                return this.ajaxModel(200, '出库成功');
            }
        }
    }

    /**
     * good entering warehouse
     * @method in
     * @param  {Number} id      : good id
     * @param  {Number} amount  : good number
     * @param  {Double} price   : good price
     * @param  {Array} attrs    : attrs
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    async in (transaction, id, amount, price, attrs, user_id) {
        var good = await this.model.Good.findOne({
            where: {
                user_id: user_id,
                id: id
            }
        });

        if (!good) {
            throw new this.ERRORS.NotFound('没有找到指定的商品');
        } else {
            await good.update({
                count: good.count + amount
            }, {
                transaction: transaction
            });
            var record = await this.model.Record.create({
                good_id: id,
                user_id: user_id,
                price: price,
                amount: amount,
                type: -1
            }, {
                transaction: transaction
            });

            if (attrs.length > 0) {
                let rows = await this.model.Attr.findAll({
                    where: {
                        id: {
                            $in: attrs
                        }
                    }
                })
                await record.addAttrs(rows, {
                    transaction: transaction
                });

                var temp = permutations(attrs, attrs.length);
                var ors = [];
                for (var i = 0; i < temp.length; i++) {
                    ors.push({
                        attr_id: temp[i].join(',')
                    });
                }

                var goodsub = await this.model.GoodSub.findOne({
                    include: {
                        model: this.model.V_Attr,
                        where: {
                            $or: ors
                        }
                    },
                    where: {
                        good_id: id
                    }
                });

                if (!goodsub) {
                    var newGoodSub = await this.model.GoodSub.create({
                        count: amount,
                        good_id: id
                    }, {
                        transaction: transaction
                    });
                    let rows = await this.model.Attr.findAll({
                        where: {
                            id: {
                                $in: attrs
                            }
                        }
                    })
                    await newGoodSub.addAttrs(rows, {
                        transaction: transaction
                    });
                } else {
                    await goodsub.update({
                        count: goodsub.count + amount
                    }, {
                        transaction: transaction
                    });
                }
            }

            return this.ajaxModel(200, '出库成功');
        }
    }

    /**
     * get good attributes
     * @method attrs
     * @param  {Number} user_id  : user id
     * @param  {Number} good_id : good id
     * @return {Promise}
     */
    async attrs(user_id, good_id) {
        var rows = await this.model.Attr.findAll({
            attributes: ['id', 'attr'],
            include: [{
                model: this.model.Good,
                attributes: [],
                where: {
                    user_id: user_id,
                    id: good_id
                }
            }],
            order: [
                ['attr', 'DESC']
            ]
        });

        return this.ajaxModel(200, rows);
    }

    /**
     * add attr to good
     * @method addAttr
     * @param  {Number} user_id : user id
     * @param  {Number} good_id : good id
     * @param  {String} attr    : good attr
     */
    async addAttr(transaction, user_id, good_id, attr) {
        var good = await this.model.Good.findOne({
            include: [{
                model: this.model.Attr,
                through: {
                    attributes: []
                }
            }],
            where: {
                user_id: user_id,
                id: good_id
            }
        });
        if (!good) {
            throw new this.ERRORS.NotFound('商品不存在！');
        } else {
            var exist = false;
            if (good.attrs) {
                good.attrs.forEach((item) => {
                    if (item.attr === attr) {
                        exist = true;
                    }
                });
            }
            if (exist) {
                throw new this.ERRORS.Exist(`商品属性${attr}已经存在！`);
            } else {
                var newAttr = await this.model.Attr.create({
                    attr: attr
                }, {
                    transaction: transaction
                });

                await good.addAttrs(newAttr, {
                    transaction: transaction
                });

                return this.ajaxModel(200, '商品属性添加成功');
            }
        }
    }

    /**
     * get attrlist with goods count > 0
     * @method attrlist
     * @param  {Number} user_id  : user id
     * @param  {Number} good_id : good id
     * @return {Promise}
     */
    async attrlist(user_id, good_id) {
        var rows = await this.model.GoodSub.findAll({
            attributes: {
                exclude: ['good_id']
            },
            include: [{
                model: this.model.Good,
                attributes: [],
                where: {
                    user_id: user_id,
                    id: good_id
                }
            }, {
                model: this.model.Attr,
                attributes: ['id', 'attr'],
                through: {
                    attributes: []
                }
            }]
        });

        return this.ajaxModel(200, rows);
    }

    /**
     * get good trend info
     * @method trend
     * @param  {Number} user_id  : user id
     * @param  {Number} good_id  : good id
     * @param  {String} attr     : good attributes
     * @return {Promise}
     */
    async trend(user_id, good_id, attr) {
        if (good_id && attr) {
            //TODO
            return Attrs.findAll({
                attributes: [],
                include: [{
                    model: this.model.Good,
                    where: {
                        user_id: user_id,
                        id: good_id
                    }
                }],
                order: [
                    ['attr', 'ASC']
                ]
            }).then((rows) => {
                return this.ajaxModel(200, rows);
            });
        } else {
            var date = Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d');
            if (good_id) {
                var rows = await this.model.Record.findAll({
                    attributes: [
                        [Sequelize.literal('sum(type * -1 * amount)'), 'amount'],
                        [date, 'date']
                    ],
                    include: [{
                        model: this.model.Good,
                        attributes: ['name', 'count'],
                        where: {
                            user_id: user_id,
                            id: good_id
                        }
                    }],
                    group: [date],
                    order: [
                        [date, 'ASC']
                    ]
                });

                var ret = {
                    datasets: [{
                        data: []
                    }],
                    labels: []
                };

                var count = 0;
                for (var i = 0; i < rows.length; i++) {
                    var record = rows[i].toJSON();
                    var name = record.good.name;
                    var amount = record.amount;
                    var date = record.date;
                    count += amount;
                    ret.datasets[0].label = name;
                    ret.datasets[0].data.push(count);
                    ret.labels.push(date);
                }

                if (rows.length > 0) {
                    if (count == rows[0].toJSON().good.count) {
                        return this.ajaxModel(200, ret);
                    } else {
                        throw new this.ERRORS.DataError(`数据错误，库存和出入库记录总数无法匹配。商品ID: ${good_id}`);
                    }
                } else {
                    return this.ajaxModel(200, ret);
                }
            } else {
                var rows = await this.model.Record.findAll({
                    attributes: [
                        [Sequelize.literal('sum(type * -1 * amount)'), 'amount'],
                        [date, 'date']
                    ],
                    include: [{
                        model: this.model.Good,
                        attributes: ['count'],
                        where: {
                            user_id: user_id
                        }
                    }],
                    group: [date],
                    order: [
                        [date, 'ASC']
                    ]
                });
                var ret = {
                    datasets: [{
                        data: []
                    }],
                    labels: []
                };

                var count = 0;
                var total = [];
                for (var i = 0; i < rows.length; i++) {
                    var record = rows[i].toJSON();
                    var amount = record.amount;
                    var date = record.date;
                    count += amount;
                    ret.datasets[0].label = "所有库存";
                    ret.datasets[0].data.push(count);
                    ret.labels.push(date);
                    if (total.indexOf(record.count) == -1) {
                        total.push(record.count);
                    }
                }

                if (rows.length > 0) {
                    var _count = 0;
                    total.forEach((number) => {
                        _count += number;
                    });
                    if (count == _count) {
                        return this.ajaxModel(200, ret);
                    } else {
                        this.logger.info('数据错误，库存和出入库记录总数无法匹配，可能存在有库存无销售记录的商品。');
                        return this.ajaxModel(200, ret);
                        // throw new this.ERRORS.DataError('数据错误，库存和出入库记录总数无法匹配，可能存在有库存无销售记录的商品。');
                    }
                } else {
                    return this.ajaxModel(200, ret);
                }
            }
        }
    }
}

module.exports = new GoodsDao();
