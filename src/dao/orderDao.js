var Sequelize = require('sequelize');
var BaseDao = require('./baseDao'),
    goodDao = require('./goodDao');

class OrderDao extends BaseDao {

    /**
     * create order
     * @method create
     * @param  {Number} user_id     : user id
     * @param  {Number} orderId     : order id
     * @param  {Number} expressId   : express id
     * @param  {Number} expressCost : express cost
     * @param  {String} name        : buyer
     * @param  {Double} price       : order price
     * @param  {List} goodList      : good list
     * @param  {String} comment     : comment
     * @return {Promise}
     */
    create(transaction, user_id, orderId, expressId, expressCost, name, price, goodList, comment) {
        return this.model.Order.create({
            id: orderId,
            expressId: expressId,
            expressCost: expressCost,
            name: name,
            user_id: user_id,
            comment: comment,
            price: price
        }, {
            transaction: transaction
        }).then((order) => {
            if (order) {
                var promises = [];
                for (var i = 0; i < goodList.length; i++) {
                    var _good = goodList[i];
                    promises.push(goodDao.out(_good.id, _good.amount, price, _good.attr,
                        user_id, orderId));
                }
                return Promise.all(promises).then((result) => {
                    return this.ajaxModel(200, '创建成功!');
                });
            }
        });
    }

    /**
     * list order
     * @method list
     * @param  {Number} user_id  : user id
     * @param  {Number} page     : page index
     * @param  {Number} pageSize : page size
     * @return {Promise}
     */
    list(user_id, page, pageSize) {
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * (page - 1) : 0;

        return this.model.Order.findAndCountAll({
            limit: limit,
            offset: offset,
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('expressDate'), '%Y-%m-%d'), 'date'],
                'id', 'expressCost', 'expressId', 'name', 'price', 'comment'
            ],
            where: {
                user_id: user_id
            },
            order: [
                ['expressDate', 'DESC']
            ]
        }).then((result) => {
            return this.ajaxModel(200, {
                count: result.count,
                content: result.rows
            });
        });
    }

    /**
     * order detail
     * @method orderDetail
     * @param  {Number} user_id  : user id
     * @param  {Number} order_id : order id
     * @return {Promise}
     */
    orderDetail(user_id, order_id) {
        return this.model.Record.findAll({
            include: [{
                model: this.model.Good,
                attributes: ['name'],
                where: {
                    user_id: user_id
                }
            }, {
                model: this.model.Attr,
                through: {
                    attributes: []
                }
            }],
            where: {
                order_id: order_id
            }
        }).then((rows) => {
            return this.ajaxModel(200, rows);
        });
    }
}

module.exports = new OrderDao();
