var Sequelize = require('sequelize'),
    sequelize = require('../db/sequelize');
var BaseDao = require('./baseDao'),
    GoodDao = require('./goodDao'),
    goodDao = new GoodDao();
var model = require('../model');
var logger = require('../logger'),
    MESSAGES = require('../config/message');


class OrderDao extends BaseDao {

    create(user_id, orderId, expressId, expressCost, name, price, goodList, comment) {
        var querys = [{
            sql: 'insert into `order` (`id`,`expressId`,`expressCost`,`name`,`user_id`, `comment`, `price`) values(?,?,?,?,?,?,?)',
            params: [orderId, expressId, expressCost, name, user_id, comment, price]
        }];

        for (var i = 0; i < goodList.length; i++) {
            var _good = goodList[i];
            var attr = _good.attr;

            goodDao.out();

            Array.prototype.push.apply(querys, [{
                sql: 'select g.* from goods g left join r_user_goods r on r.goods_id = g.id where r.user_id = ? and g.id = ?',
                params: [user_id, _good.id],
                parse(rows) {
                    if (rows && rows.length > 0) {
                        var good = rows[0];
                        if (good.count < _good.amount) {
                            return {
                                error: '库存不足'
                            };
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

        return model.Order.findAndCountAll({
            limit: limit,
            offset: offset,
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-%d'), 'date'],
                'id', 'expressCost', 'expressId', 'name', 'price', 'comment'
            ],
            where: {
                user_id: user_id
            },
            order: [
                ['expressDate', 'DESC']
            ]
        }).then((result) => {
            return this.model(200, {
                count: result.count,
                content: result.rows
            })
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });
    }

    orderDetail(user_id, order_id) {
        return model.Records.findAll({
            include: {
                model: model.Goods,
                where: {
                    order_id: order_id,
                    user_id: user_id
                }
            }
        }).then((rows) => {
            return this.model(200, rows);
        }).catch((err) => {
            logger.error(err);
            return this.model(500, MESSAGES.SERVER_ERROR);
        });
    }
}

module.exports = new OrderDao;
