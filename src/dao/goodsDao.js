var sequelize = require('sequelize');
var BaseDao = require('./baseDao');
var logger = require('../logger');
var model = require('../model');

class GoodsDao extends BaseDao {

    search(user_id, name) {
        return this.query({
            sql: 'select g.id, g.name from goods g \
                    left join r_user_goods rug on rug.goods_id = g.id \
                    where rug.user_id = ? and g.name like ? ',
            params: [user_id, '%' + name + '%']
        });
    }

    /**
     * list goods of given user
     * @method list
     * @param  {Number} user_id : user id
     * @return {Promise}
     */
    list(user_id) {
        return model.Goods.findAndCountAll({
            include: [{
                model: model.User,
                attributes: [],
                where: {
                    id: user_id
                },
                through: {
                    attributes: []
                }
            }]
        }).then((result) => {
            return this.model(200, {
                count: result.count,
                content: result.rows
            });
        }).catch((err) => {
            logger.error(err);
            return this.model(500, '服务器出错');
        });
    }

    detail(id, user_id) {
        return this.query({
            sql: 'select g.id, g.name, g.count as total from goods g \
                    left join r_user_goods rug on g.id = rug.goods_id \
                    where g.id = ? and rug.user_id = ?',
            params: [id, user_id],
            parse(rows) {
                if (rows && rows.length > 0) {
                    var good = rows[0];
                    var ret = {
                        id: good.id,
                        name: good.name,
                        total: good.total,
                        list: []
                    };
                    return ret;
                } else {
                    return {
                        error: '不存在该商品'
                    };
                }
            }
        }, {
            sql: 'select g_a.attr, g_a.count from goods_attrs g_a \
                left join goods g on g_a.goods_id = g.id \
                left join r_user_goods rug on g.id = rug.goods_id \
                where g.id = ? and rug.user_id = ?',
            params: [id, user_id],
            parse(rows, data) {
                if (rows && rows.length > 0) {
                    data.list = rows;
                }

                return data;
            }
        });
    }

    create(name, attrs, user_id) {
        var querys = [{
            sql: 'select g.id from goods g left join r_user_goods r on r.goods_id = g.id where r.user_id = ? and g.name = ?',
            params: [user_id, name],
            parse(rows) {
                if (rows.length > 0) {
                    return {
                        error: '商品已经存在'
                    };
                }

                return rows;
            }
        }, {
            sql: 'insert into goods (`name`) values (?)',
            params: [name]
        }, {
            sql: 'insert into r_user_goods (`user_id`, `goods_id`) values (?, ?)',
            params(result) {
                return [user_id, result.insertId];
            },
            parse(result, data) {
                return data;
            }
        }];

        if (attrs.length > 0) {
            attrs.forEach((attr) => {
                querys.push({
                    sql: 'insert into r_user_goods_attr (`user_id`, `attr`,`goods_id`) values (?, ?, ?)',
                    params(result) {
                        return [user_id, attr, result.insertId];
                    },
                    parse(result, data) {
                        return data;
                    }
                });
            });
        }

        return this.queryWithTransaction(...querys);
    }

    modify(record_id, amount, price, good_attr, user_id, type) {
        var querys = [{
            sql: 'select * from goods_records where id = ? and user_id = ? and goods_attr = ?',
            params: [record_id, user_id, good_attr],
            parse(rows) {
                if (rows && rows.length == 1) {
                    return rows[0];
                } else {
                    return {
                        error: '不存在该出入库记录'
                    };
                }
            }
        }, {
            sql: 'update goods_records set price = ?, amount = ? where id = ?',
            params: [price, amount, record_id],
            parse(result, data) {
                return {
                    diff: (data.amount - amount) * type,
                    goods_id: data.goods_id
                };
            }
        }, {
            sql: 'update goods set count = count + ? where id = ?',
            params(data) {
                return [data.diff, data.goods_id];
            },
            parse(result, data) {
                return data;
            }
        }];

        if (good_attr) {
            querys.push({
                sql: 'update goods_attrs set count = count + ? where goods_id = ? and attr = ?',
                params(data) {
                    return [data.diff, data.goods_id, good_attr];
                }
            });
        }

        return this.queryWithTransaction(...querys);
    }

    inlist(user_id, type, page, pageSize) {
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * (page - 1) : 0;

        return Records.findAll({

        })

        var querys = [{
            sql: 'select g_r.id, g_r.goods_id, g_r.goods_attr, g_r.amount, g_r.price, DATE_FORMAT(g_r.date, \'%Y-%m-%d\') as date, g.name from goods_records g_r \
                left join goods g on g.id = g_r.goods_id \
                where g_r.user_id = ? and type = ? \
                order by date desc \
                limit ? offset ?',
            params: [user_id, type, limit, offset],
            parse(rows) {
                return rows;
            }
        }, {
            sql: 'select count(*) as count from goods_records g_r \
                left join goods g on g.id = g_r.goods_id \
                where g_r.user_id = ? and type = ?',
            params: [user_id, type],
            parse(results, rows) {
                return {
                    count: results[0].count,
                    content: rows
                };
            }
        }];
        return this.query(...querys);
    }

    out(id, amount, price, attr, user_id) {
        var querys = [{
            sql: 'select g.* from goods g left join r_user_goods r on r.goods_id = g.id where r.user_id = ? and g.id = ?',
            params: [user_id, id],
            parse(rows) {
                if (rows && rows.length > 0) {
                    var good = rows[0];
                    if (good.count < amount) {
                        return {
                            error: '库存不足'
                        };
                    }
                    return good;
                }

                return {
                    error: '不存在该商品'
                };
            }
        }, {
            sql: 'update goods set count = count - ? where id = ?',
            params: [amount, id]
        }, {
            sql: 'insert into `goods_records` (`goods_id`, `user_id`, `goods_attr`, `price`, `amount`, `type`) VALUES (?,?,?,?,?,1)',
            params: [id, user_id, attr, price, amount]
        }];

        if (attr) {
            Array.prototype.push.apply(querys, [{
                sql: 'select * from goods_attrs where attr = ? and goods_id = ?',
                params: [attr, id],
                parse(rows) {
                    if (rows && rows.length > 0) {
                        var good = rows[0];
                        if (good.count < amount) {
                            return {
                                error: attr + ':该类商品库存不足'
                            };
                        }
                        return good;
                    }

                    return {
                        error: '不存在该商品属性' + attr
                    };
                }
            }, {
                sql: 'update goods_attrs set count = count - ? where attr = ? and goods_id = ?',
                params: [amount, attr, id],
                parse(result) {
                    if (result) {
                        if (result.changedRows == 1) {
                            return {};
                        } else if (result.changedRows === 0) {
                            return {
                                error: '不存在该商品属性' + attr
                            };
                        } else {
                            return {
                                error: '数据错误，请联系管理员'
                            };
                        }
                    }
                }
            }]);
        }

        return this.queryWithTransaction(...querys);
    }

    in (id, amount, price, attr, user_id) {
        var querys = [{
            sql: 'select g.* from goods g left join r_user_goods r on r.goods_id = g.id where r.user_id = ? and g.id = ?',
            params: [user_id, id],
            parse(rows) {
                if (rows && rows.length > 0) {
                    return rows[0];
                }

                return {
                    error: '不存在该商品'
                };
            }
        }, {
            sql: 'update goods set count = ? where id = ?',
            params(good) {
                return [good.count + amount, id];
            }
        }, {
            sql: 'insert into `goods_records` (`goods_id`, `user_id`, `goods_attr`, `price`, `amount`) VALUES (?,?,?,?,?)',
            params: [id, user_id, attr, price, amount]
        }];

        if (attr) {
            Array.prototype.push.apply(querys, [{
                sql: 'update goods_attrs set count = count + ? where attr = ? and goods_id = ?',
                params: [amount, attr, id],
                parse(result) {
                    if (result) {
                        if (result.changedRows == 1) {
                            return {
                                error: true
                            };
                        } else if (result.changedRows === 0) {
                            return {};
                        } else {
                            return {
                                error: '数据错误，请联系管理员'
                            };
                        }
                    }
                }
            }, {
                sql: 'insert into `goods_attrs` (`goods_id`, `count`, `attr`) VALUES (?,?,?)',
                params: [id, amount, attr],
                parse(result) {
                    return {
                        id: result.insertId
                    };
                }
            }]);
        }

        return this.queryWithTransaction(...querys);
    }

    /**
     * get goods attributes
     * @method attrs
     * @param  {Number} user_id  : user id
     * @param  {Number} goods_id : good id
     * @return {Promise}
     */
    attrs(user_id, goods_id) {
        return model.Attr.findAll({
            attributes: ['attr'],
            include: [{
                model: model.Goods,
                attributes: [],
                include: [{
                    model: model.User,
                    where: {
                        id: user_id
                    }
                }],
                where: {
                    id: goods_id
                }
            }],
            order: [
                ['attr', 'DESC']
            ]
        }).then((rows) => {
            return this.model(200, rows);
        }).catch((err) => {
            logger.error(err);
            return this.model(500, '服务器出错');
        });
    }

    addAttr(user_id, goods_id, attr) {
        return this.queryWithTransaction({
            sql: 'insert into r_user_goods_attr (`user_id`, `goods_id`, `attr`) values (?, ?, ?)',
            params: [user_id, goods_id, attr],
            parse(rows) {
                return rows;
            }
        });
    }

    /**
     * get attrlist with goods count > 0
     * @method attrlist
     * @param  {Number} user_id  : user id
     * @param  {Number} goods_id : goods id
     * @return {Promise}
     */
    attrlist(user_id, goods_id) {
        return model.Attrs.findAll({
            attributes: ['attr'],
            include: [{
                model: model.Goods,
                attributes: [],
                include: [{
                    model: model.User,
                    where: {
                        id: user_id
                    }
                }],
                where: {
                    id: goods_id
                }
            }]
        }).then((rows) => {
            return this.model(200, rows);
        }).catch((err) => {
            logger.error(err);
            return this.model(500, '服务器出错');
        });
    }

    /**
     * get goods trend info
     * @method trend
     * @param  {Number} user_id  : user id
     * @param  {Number} goods_id : goods id
     * @param  {String} attr     : goods attributes
     * @return {Promise}
     */
    trend(user_id, goods_id, attr) {
        if (goods_id && attr) {
            return Attrs.findAll({
                attributes: [],
                include: [{
                    model: model.Goods,
                    include: [{
                        model: model.User,
                        where: {
                            id: user_id
                        }
                    }],
                    where: {
                        id: goods_id
                    }
                }],
                order: [
                    ['attr', 'ASC']
                ]
            }).then((rows) => {
                return this.model(200, rows);
            }).catch((err) => {
                logger.error(err);
                return this.model(500, '服务器出错');
            });
        } else {
            var date = sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y-%m-%d');
            if (goods_id) {
                return model.Records.findAll({
                    attributes: [
                        [sequelize.literal('sum(type * -1 * amount)'), 'amount'],
                        [date, 'date']
                    ],
                    include: [{
                        model: model.Goods,
                        attributes: ['name', 'count'],
                        include: [{
                            model: model.User,
                            attributes: [],
                            where: {
                                id: user_id
                            }
                        }],
                        where: {
                            id: goods_id
                        }
                    }],
                    group: [
                        date
                    ],
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
                            logger.error('商品ID: %s', goods_id);
                            return this.model(500, ret);
                        }
                    } else {
                        return this.model(200, ret);
                    }
                }).catch((err) => {
                    logger.error(err);
                    return this.model(500, '服务器出错');
                });
            } else {
                return model.Records.findAll({
                    attributes: [
                        [sequelize.literal('sum(type * -1 * amount)'), 'amount'],
                        [date, 'date']
                    ],
                    include: [{
                        model: model.Goods,
                        attributes: ['count'],
                        include: [{
                            model: model.User,
                            attributes: [],
                            where: {
                                id: user_id
                            }
                        }]
                    }],
                    group: [
                        date
                    ],
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
                            total.push(record.count)
                        }
                    }

                    if (rows.length > 0) {
                        var _count = 0;
                        total.forEach((number) => {
                            _count += number;
                        })
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
                    return this.model(500, '服务器出错');
                });
            }
        }

        // var querys = [];
        // if (attr) {
        //     querys.push({
        //         sql: 'select g.attr, g.count, sum(gr.type * -1 * gr.amount) as amount, DATE_FORMAT(gr.date, \'%Y-%m-%d\') as date from goods_attrs g \
        //             left join goods_records gr on gr.goods_id = g.goods_id and gr.goods_attr = g.attr \
        //             left join r_user_goods rug on rug.goods_id = g.goods_id \
        //             where g.goods_id = ? and rug.user_id = ? and g.attr = ? \
        //             group by DATE_FORMAT(gr.date, \'%Y-%m-%d\'), g.attr \
        //             order by g.attr, DATE_FORMAT(gr.date, \'%Y-%m-%d\') asc;',
        //         params: [goods_id, user_id, attr],
        //         parse(rows) {
        //             var ret = {
        //                 datasets: [{
        //                     data: []
        //                 }],
        //                 labels: []
        //             };
        //             if (rows && rows.length > 0) {
        //                 var count = 0;
        //                 for (var i = 0; i < rows.length; i++) {
        //                     var record = rows[0];
        //                     var name = record.name;
        //                     var amount = record.amount;
        //                     var type = record.type;
        //                     var date = record.date;
        //
        //                     switch (type) {
        //                         case 1:
        //                             count -= amount;
        //                             break;
        //                         case 0:
        //                         default:
        //                             count += amount;
        //                             break;
        //                     }
        //                     ret.datasets[0].label = name;
        //                     ret.datasets[0].data.push(count);
        //                     ret.labels.push(date);
        //                 }
        //
        //                 if (count == rows[0].count) {
        //                     return ret;
        //                 } else {
        //                     logger.error('数据错误，库存和出入库记录总数无法匹配');
        //                     logger.error('用户ID: %s', user_id);
        //                     logger.error('商品ID: %s', goods_id);
        //                     logger.error('属性名称: %s', attr);
        //                     return ret;
        //                 }
        //             } else {
        //                 return {};
        //             }
        //         }
        //     });
        // } else {
        //     querys.push({
        //         sql: 'select g.count, g.name, sum(gr.type * -1 * gr.amount) as amount, DATE_FORMAT(gr.date, \'%Y-%m-%d\') as date from goods g \
        //                 left join goods_records gr on gr.goods_id = g.id \
        //                 left join r_user_goods rug on rug.goods_id = g.id \
        //                 where g.id = ? and rug.user_id = ? \
        //                 group by DATE_FORMAT(gr.date, \'%Y-%m-%d\') \
        //                 order by DATE_FORMAT(gr.date, \'%Y-%m-%d\') asc',
        //         params: [goods_id, user_id],
        //         parse(rows) {

        //
        //             return {};
        //         }
        //     });
        // }
        //
        // return this.query(...querys);
    }
}

module.exports = new GoodsDao();
