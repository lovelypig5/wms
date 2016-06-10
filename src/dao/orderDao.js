var BaseDao = require('./baseDao');
var logger = require('../logger');

class OrderDao extends BaseDao {

    create(user_id, orderId, expressId, expressCost, name, price, goodList, comment) {
        var querys = [{
            sql: 'insert into `order` (`id`,`expressId`,`expressCost`,`name`,`user_id`, `comment`, `price`) values(?,?,?,?,?,?,?)',
            params: [orderId, expressId, expressCost, name, user_id, comment, price]
        }];

        for (var i = 0; i < goodList.length; i++) {
            var _good = goodList[i];
            var attr = _good.attr.join(',');

            Array.prototype.push.apply(querys, [{
                sql: 'select g.* from goods g left join r_user_goods r on r.goods_id = g.id where r.user_id = ? and g.id = ?',
                params: [user_id, _good.id],
                parse(rows) {
                    if (rows && rows.length > 0) {
                        var good = rows[0];
                        if (good.count < _good.amount) {
                            return {
                                error: '库存不足'
                            }
                        }
                        return good;
                    }

                    return {
                        error: '不存在该商品'
                    }
                }
            }, {
                sql: 'update goods set count = count - ? where id = ?',
                params: [_good.amount, _good.id]
            }, {
                sql: 'insert into `goods_records` (`goods_id`, `user_id`, `goods_attr`, `price`, `amount`, `type`, `order_id`) VALUES (?,?,?,?,?,1,?)',
                params: [_good.id, user_id, attr, price / goodList.length, _good.amount, orderId]
            }])

            if (attr) {
                Array.prototype.push.apply(querys, [{
                    sql: 'select * from goods_attrs where attr = ? and goods_id = ?',
                    params: [attr, _good.id],
                    parse(rows) {
                        if (rows && rows.length > 0) {
                            var good = rows[0];
                            if (good.count < _good.amount) {
                                return {
                                    error: attr + ':该类商品库存不足'
                                }
                            }
                            return good;
                        }

                        return {
                            error: '不存在该商品属性' + attr
                        }
                    }
                }, {
                    sql: 'update goods_attrs set count = count - ? where attr = ? and goods_id = ?',
                    params: [_good.amount, attr, _good.id],
                    parse(result) {
                        if (result) {
                            if (result.changedRows == 1) {
                                return {}
                            } else if (result.changedRows == 0) {
                                return {
                                    error: '不存在该商品属性' + attr
                                }
                            } else {
                                return {
                                    error: '数据错误，请联系管理员'
                                }
                            }
                        }
                    }
                }])
            }
        }

        return this.queryWithTransaction(...querys);
    }

    list(user_id, page, pageSize) {
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * (page - 1) : 0;

        var querys = [{
            sql: 'select id, expressCost, expressId, name, price, comment, DATE_FORMAT(expressDate, \'%Y-%m-%d\') as date from `order` where user_id = ? order by expressDate desc limit ? offset ?',
            params: [user_id, limit, offset],
            parse(rows) {
                return rows;
            }
        }, {
            sql: 'select count(*) as count from `order` where user_id = ?',
            params: [user_id],
            parse(results, rows) {
                return {
                    count: results[0].count,
                    content: rows
                }
            }
        }]

        return this.query(...querys);
    }

    orderDetail(user_id, order_id) {
        return this.query({
            sql: 'select g.name, g.id, g_r.goods_attr, g_r.amount from goods_records g_r \
            left join goods g on g.id = g_r.goods_id \
            where g_r.order_id = ? and g_r.user_id = ?',
            params: [order_id, user_id],
            parse(rows) {
                return rows;
            }
        })
    }
}

module.exports = new OrderDao;