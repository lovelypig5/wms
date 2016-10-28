var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');
var BaseDao = require('./baseDao');
var model = require('../model');
var logger = require('../logger'),
    MESSAGES = require('../config/message');

class GoodsDao extends BaseDao {

    /**
     * search good according to name
     * @method search
     * @param  {Number} user_id : user id
     * @param  {String} name    : search term
     * @return {Promise}
     */
    search(user_id, name) {
        return model.Good.findAll({
            limit: 10,
            attributes: ['id', 'name'],
            where: {
                user_id: user_id,
                name: {
                    $like: '%' + name + '%'
                }
            }
        }).then((rows) => {
            return this.model(200, rows);
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });
    }

    /**
     * list goods of given user
     * @method list
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    list(user_id) {
        // ISSUE CHECKED
        return model.Good.findAndCountAll({
            where: {
                user_id: user_id
            }
        }).then((result) => {
            return this.model(200, {
                count: result.count,
                content: result.rows
            });
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });
    }

    /**
     * get goods detail
     * @method detail
     * @param  {Number} id      : good id
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    detail(id, user_id) {
        //ISSUES CHECKED
        return model.Good.findOne({
            include: [{
                model: model.GoodSub,
                attributes: ['id', 'count'],
                include: [{
                    model: model.Attr,
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
        }).then((good) => {
            if (good) {
                return this.model(200, {
                    id: good.id,
                    name: good.name,
                    total: good.count,
                    list: good.goodsubs
                });
            } else {
                return this.model(400, '不存在该商品');
            }
        }).catch((err) => {
            logger.error(err);
            return this.model(500, '服务器出错,不能获取商品详情！');
        });
    }

    /**
     * create new good
     * @method create
     * @param  {String} name    : good name
     * @param  {List} attrs     : a list of attr<string>
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    create(name, attrs, user_id) {
        return model.User.findOne({
            where: {
                id: user_id
            },
            include: [{
                model: model.Good,
                required: false,
                where: {
                    name: name
                }
            }]
        }).then((user) => {
            if (user.goods.length > 0) {
                return this.model(400, '商品已经存在！');
            } else {
                return sequelize.transaction((transaction) => {
                    return model.Good.create({
                        name: name,
                        count: 0
                    }, {
                        transaction: transaction
                    }).then((goods) => {
                        var promises = [user.addGoods(goods, {
                            transaction: transaction
                        })];
                        if (attrs.length > 0) {
                            attrs.forEach((attr) => {
                                let promise = model.Attr.create({
                                    user_id: user_id,
                                    goods_id: goods.id,
                                    attr: attr
                                }, {
                                    transaction: transaction
                                });
                                promises.push(promise);
                            });
                        }
                        return Promise.all(promises).then(() => {
                            return this.model(200, goods);
                        });
                    });
                });
            }
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });
    }

    modify(record_id, amount, price, user_id) {
        return model.Record.findOne({
            include: [{
                model: model.Good,
                where: {
                    user_id: user_id
                }
            }, {
                model: model.Attr
            }],
            where: {
                id: record_id
            }
        }).then((record) => {
            if (!record) {
                return this.model(400, '没有找到对应的记录！');
            }

            return sequelize.transaction((transaction) => {
                let getPromise = () => {
                    var promises = [];
                    promises.push(record.update({
                        price: price,
                        amount: amount
                    }, {
                        transaction: transaction
                    }).then((record) => {
                        return record.good.update({
                            count: record.good.count + diff
                        }, {
                            transaction: transaction
                        });
                    }));

                    return promises;
                };

                let attrs = record.attrs;
                if (attrs.length > 0) {
                    var temp = [];
                    attrs.forEach((item) => {
                        temp.push(item.id);
                    });
                    return model.GoodSub.findAll({
                        include: [{
                            model: model.Attr,
                            where: {
                                id: {
                                    $in: temp
                                }
                            }
                        }],
                        where: {
                            good_id: record.good_id
                        }
                    }).then((goodsub) => {
                        console.log(goodsub);
                        if (!goodsub) {
                            return this.model(400, '没有找到对应的记录');
                        } else {
                            console.log(goodsub.count);
                            console.log(amount);
                            console.log(record.type);
                            let diff = (goodsub.count - amount) * record.type;

                            if (diff + goodsub.count < 0) {
                                return this.model(400, '库存不足');
                            }

                            let promises = getPromise();
                            promises.push(model.GoodSub.update({
                                count: diff + goodsub.count
                            }, {
                                transaction: transaction,
                                where: {
                                    id: goodsub.id
                                }
                            }));

                            return Promise.all(promises).then(() => {
                                return this.model(200, '修改成功');
                            });
                        }
                    })
                } else {
                    var promises = getPromise();
                    return Promise.all(promises).then(() => {
                        return this.model(200, '修改成功');
                    });
                }
            });
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });

        // var querys = [{
        //     sql: 'select * from goods_records where id = ? and user_id = ? and goods_attr = ?',
        //     params: [record_id, user_id, good_attr],
        //     parse(rows) {
        //         if (rows && rows.length == 1) {
        //             return rows[0];
        //         } else {
        //             return {
        //                 error: '不存在该出入库记录'
        //             };
        //         }
        //     }
        // }, {
        //     sql: 'update goods_records set price = ?, amount = ? where id = ?',
        //     params: [price, amount, record_id],
        //     parse(result, data) {
        //         return {
        //             diff: (data.amount - amount) * type,
        //             goods_id: data.goods_id
        //         };
        //     }
        // }, {
        //     sql: 'update goods set count = count + ? where id = ?',
        //     params(data) {
        //         return [data.diff, data.goods_id];
        //     },
        //     parse(result, data) {
        //         return data;
        //     }
        // }];
        //
        // if (good_attr) {
        //     querys.push({
        //         sql: 'update goods_attrs set count = count + ? where goods_id = ? and attr = ?',
        //         params(data) {
        //             return [data.diff, data.goods_id, good_attr];
        //         }
        //     });
        // }
        //
        // return this.queryWithTransaction(...querys);
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
    inlist(user_id, type, page, pageSize) {
        //ISSUES CHECKED
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * (page - 1) : 0;

        var promises = [];
        promises.push(model.Record.count({
            limit: limit,
            offset: offset,
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d'), 'date'],
                'id', 'good_id', 'amount', 'price'
            ],
            include: [{
                model: model.Good,
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
        }));
        promises.push(model.Record.findAll({
            limit: limit,
            offset: offset,
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d'), 'date'],
                'id', 'good_id', 'amount', 'price'
            ],
            include: [{
                model: model.Attr,
                attributes: ['attr'],
                through: {
                    attributes: []
                }
            }, {
                model: model.Good,
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
        }));

        return Promise.all(promises).then((result) => {
            return this.model(200, {
                count: result[0],
                content: result[1]
            });
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
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
    out(id, amount, price, attr, user_id) {
        return model.Good.findOne({

            where: {
                user_id: user_id,
                id: id
            }
        }).then((good) => {
            if (!good) {
                return this.model(400, '没有找到指定的商品');
            } else {
                if (good.count < amount) {
                    return this.model(400, '库存不足');
                } else {
                    return sequelize.transaction((transaction) => {
                        let getPromise = () => {
                            var promises = [good.update({
                                count: good.count - amount
                            }, {
                                transaction: transaction
                            }), model.Record.create({
                                good_id: id,
                                user_id: user_id,
                                price: price,
                                amount: amount,
                                type: 1
                            }, {
                                transaction: transaction
                            }).then((record) => {
                                if (attr) {
                                    return model.Attr.findAll({
                                        where: {
                                            attr: {
                                                $in: attrs
                                            }
                                        }
                                    }).then((rows) => {
                                        return record.addAttrs(rows, {
                                            transaction: transaction
                                        });
                                    });
                                }
                            })];

                            return promises;
                        };


                        var attrs = [];
                        if (attr) {
                            attrs = attr.split(',');
                            return model.GoodSub.findOne({
                                include: {
                                    model: model.Attr,
                                    where: {
                                        attr: {
                                            $in: attrs
                                        }
                                    }
                                },
                                where: {
                                    good_id: id
                                }
                            }).then((goodsub) => {
                                if (!goodsub || goodsub.attrs.length != attrs.length) {
                                    return this.model(400, `不存在该商品属性:${attr}`);
                                } else {
                                    if (goodsub.count < amount) {
                                        return this.model(400, `商品${attr}库存不足`);
                                    } else {
                                        let promises = getPromise();
                                        promises.push(goodsub.update({
                                            count: goodsub.count - amount
                                        }, {
                                            transaction: transaction
                                        }));

                                        return Promise.all(promises).then(() => {
                                            return this.model(200, '出库成功');
                                        });
                                    }
                                }
                            });
                        } else {
                            let promises = getPromise();
                            return Promise.all(promises).then(() => {
                                return this.model(200, '出库成功');
                            });
                        }
                    });
                }
            }
        }).catch((err) => {
            logger.error(err);
            return this.model(500, '服务器出错，出库失败！');
        });
    }

    /**
     * good entering warehouse
     * @method in
     * @param  {Number} id      : good id
     * @param  {Number} amount  : good number
     * @param  {Double} price   : good price
     * @param  {String} attr    : attr string, split with ,
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    in (id, amount, price, attr, user_id) {
        return model.Good.findOne({
            where: {
                user_id: user_id,
                id: id
            }
        }).then((good) => {
            if (!good) {
                return this.model(400, '没有找到指定的商品');
            } else {
                return sequelize.transaction((transaction) => {
                    let getPromise = () => {
                        var promises = [good.update({
                            count: good.count + amount
                        }, {
                            transaction: transaction
                        }), model.Record.create({
                            good_id: id,
                            user_id: user_id,
                            price: price,
                            amount: amount,
                            type: -1
                        }, {
                            transaction: transaction
                        }).then((record) => {
                            if (attr) {
                                return model.Attr.findAll({
                                    where: {
                                        attr: {
                                            $in: attrs
                                        }
                                    }
                                }).then((rows) => {
                                    return record.addAttrs(rows, {
                                        transaction: transaction
                                    });
                                });
                            }
                        })];

                        return promises;
                    };

                    var attrs = [];
                    if (attr) {
                        attrs = attr.split(',');
                        return model.GoodSub.findOne({
                            include: {
                                model: model.Attr,
                                where: {
                                    attr: {
                                        $in: attrs
                                    }
                                }
                            },
                            where: {
                                good_id: id
                            }
                        }).then((goodsub) => {
                            let promises = getPromise();
                            if (!goodsub || goodsub.attrs.length != attrs.length) {
                                promises.push(model.GoodSub.create({
                                    count: amount,
                                    good_id: id
                                }, {
                                    transaction: transaction
                                }));
                            } else {
                                promises.push(goodsub.update({
                                    count: goodsub.count + amount
                                }, {
                                    transaction: transaction
                                }));
                            }
                            return Promise.all(promises).then(() => {
                                return this.model(200, '出库成功');
                            });
                        });
                    } else {
                        let promises = getPromise();
                        return Promise.all(promises).then(() => {
                            return this.model(200, '出库成功');
                        });
                    }
                });
            }
        }).catch((err) => {
            logger.error(err);
            return this.model(500, '服务器出错，出库失败！');
        });
    }

    /**
     * get good attributes
     * @method attrs
     * @param  {Number} user_id  : user id
     * @param  {Number} good_id : good id
     * @return {Promise}
     */
    attrs(user_id, good_id) {
        //ISSUES CHECKED
        return model.Attr.findAll({
            attributes: ['attr'],
            include: [{
                model: model.Good,
                attributes: [],
                where: {
                    user_id: user_id,
                    id: good_id
                }
            }],
            order: [
                ['attr', 'DESC']
            ]
        }).then((rows) => {
            return this.model(200, rows);
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });
    }


    addAttr(user_id, good_id, attr) {
        return model.Good.findOne({
            include: [{
                model: model.Attr,
                through: {
                    attributes: []
                }
            }],
            where: {
                user_id: user_id,
                id: good_id
            }
        }).then((good) => {
            if (!good) {
                return this.model(400, '商品不存在！');
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
                    return this.model(400, `商品属性${attr}已经存在！`);
                } else {
                    return sequelize.transaction((transaction) => {
                        return model.Attr.create({
                            attr: attr
                        }, {
                            transaction: transaction
                        }).then((newAttr) => {
                            return good.addAttrs(newAttr, {
                                transaction: transaction
                            }).then(() => {
                                return this.model(200, '商品属性添加成功');
                            });
                        });
                    });
                }
            }
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });
    }

    /**
     * get attrlist with goods count > 0
     * @method attrlist
     * @param  {Number} user_id  : user id
     * @param  {Number} good_id : good id
     * @return {Promise}
     */
    attrlist(user_id, good_id) {
        return model.GoodSub.findAll({
            attributes: {
                exclude: ['good_id']
            },
            include: [{
                model: model.Good,
                attributes: [],
                where: {
                    user_id: user_id,
                    id: good_id
                }
            }, {
                model: model.Attr,
                attributes: ['id', 'attr']
            }]
        }).then((rows) => {
            return this.model(200, rows);
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });
    }

    /**
     * get good trend info
     * @method trend
     * @param  {Number} user_id  : user id
     * @param  {Number} good_id : good id
     * @param  {String} attr     : good attributes
     * @return {Promise}
     */
    trend(user_id, good_id, attr) {
        if (good_id && attr) {
            //TODO
            return Attrs.findAll({
                attributes: [],
                include: [{
                    model: model.Good,
                    where: {
                        user_id: user_id,
                        id: good_id
                    }
                }],
                order: [
                    ['attr', 'ASC']
                ]
            }).then((rows) => {
                return this.model(200, rows);
            }).catch((err) => {
                logger.error(err);
                return this.model(500, MESSAGES.SERVER_ERROR);
            });
        } else {
            // ISSUES CHECKED
            var date = Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d');
            if (good_id) {
                return model.Record.findAll({
                    attributes: [
                        [Sequelize.literal('sum(type * -1 * amount)'), 'amount'],
                        [date, 'date']
                    ],
                    include: [{
                        model: model.Good,
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
                }).then((rows) => {
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
                            return this.model(200, ret);
                        } else {
                            logger.error('数据错误，库存和出入库记录总数无法匹配');
                            logger.error('用户ID: %s', user_id);
                            logger.error('商品ID: %s', good_id);
                            return this.model(500, ret);
                        }
                    } else {
                        return this.model(200, ret);
                    }
                }).catch((err) => {
                    logger.error(err);
                    return this.model(500, MESSAGES.SERVER_ERROR);
                });
            } else {
                return model.Record.findAll({
                    attributes: [
                        [Sequelize.literal('sum(type * -1 * amount)'), 'amount'],
                        [date, 'date']
                    ],
                    include: [{
                        model: model.Good,
                        attributes: ['count'],
                        where: {
                            user_id: user_id
                        }
                    }],
                    group: [date],
                    order: [
                        [date, 'ASC']
                    ]
                }).then((rows) => {
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
                            return this.model(200, ret);
                        } else {
                            logger.error('数据错误，库存和出入库记录总数无法匹配，可能存在有库存无销售记录的商品！');
                            logger.error('用户ID: %s', user_id);
                            return this.model(200, ret);
                        }
                    } else {
                        return this.model(200, ret);
                    }
                }).catch((err) => {
                    logger.error(err);
                    return this.model(500, MESSAGES.SERVER_ERROR);
                });
            }
        }
    }
}

module.exports = new GoodsDao();
