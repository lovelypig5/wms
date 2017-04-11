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
    async create(transaction, user_id, orderId, expressId, expressCost, name, price, goodList, comment) {
        var order = await this.model.Order.create({
            id: orderId,
            expressId: expressId,
            expressCost: expressCost,
            name: name,
            user_id: user_id,
            comment: comment,
            price: price
        }, {
            transaction: transaction
        });

        if (order) {
            var promises = [];
            for (var i = 0; i < goodList.length; i++) {
                var _good = goodList[i];
                await goodDao.out(transaction, _good.id, _good.amount, price, _good.attr, user_id, orderId);
            }
            return this.ajaxModel(200, '创建成功!');
        }
    }

    /**
     * list order
     * @method list
     * @param  {Number} user_id  : user id
     * @param  {Number} page     : page index
     * @param  {Number} pageSize : page size
     * @return {Promise}
     */
    async list(user_id, page, pageSize) {
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * (page - 1) : 0;

        var result = await this.model.Order.findAndCountAll({
            limit: limit,
            offset: offset,
            attributes: [
                [
                    Sequelize.fn('DATE_FORMAT', Sequelize.col('expressDate'), '%Y-%m-%d'),
                    'date'
                ],
                'id',
                'expressCost',
                'expressId',
                'name',
                'price',
                'comment',
                'expressDate'
            ],
            include: [{
                model: this.model.Record,
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
                }]
            }],
            where: {
                user_id: user_id
            },
            order: [
                ['expressDate', 'DESC']
            ]
        });

        return this.ajaxModel(200, {
            count: result.count,
            content: result.rows
        });
    }

    /**
     * order detail
     * @method orderDetail
     * @param  {Number} user_id  : user id
     * @param  {Number} order_id : order id
     * @return {Promise}
     */
    async orderDetail(user_id, order_id) {
        var rows = await this.model.Record.findAll({
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
        });
        return this.ajaxModel(200, rows);
    }

    /**
     * [sync description]
     * @param  {[type]} user_id [description]
     * @param  {[type]} orders  [description]
     * @return {[type]}         [description]
     */
    async sync(transaction, user_id, orders) {
        var promises = [];
        orders.forEach(async(order) => {
            var _order = JSON.stringify(order);
            await this.model.SyncModel.create({
                user_id: user_id,
                key: 'syncOrders',
                value: JSON.stringify(order)
            }, {
                transaction: transaction
            });
        })

        return this.ajaxModel(200, '解析成功!');
    }

    /**
     * [synclist description]
     * @param  {[type]} user_id [description]
     * @return {[type]}         [description]
     */
    async synclist(user_id, page, pageSize) {
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * (page - 1) : 0;

        var rows = await this.model.SyncModel.findAll({
            where: {
                user_id: user_id
            }
        });
        return this.ajaxModel(200, rows);
    }
}

module.exports = new OrderDao();
