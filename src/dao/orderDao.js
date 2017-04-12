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
        var rows = await goodDao.attrs(user_id);
        var names = {};
        var attrs = {};
        rows.ret.forEach((row) => {
            var good = row.toJSON().goods[0];
            names[good.name] = good.id;

            if (!attrs[good.name]) {
                attrs[good.name] = {};
            }
            good.attrs.forEach((item) => {
                attrs[good.name][item.attr] = item.id;
            })
        });

        for (var t = 0; t < orders.length; t++) {
            var order = orders[t];
            let goods = order.goods;
            let sync = true;

            for (var i = 0; i < goods.length; i++) {
                var good = goods[i];
                let name = good.name;
                let attributes = good.attrs;
                if (!(goods[i].id = names[name])) {
                    sync = false;
                    continue;
                };

                let ret = [];
                for (var j = 0; j < attributes.length; j++) {
                    if (!attrs[name][attributes[j]]) {
                        sync = false;
                        continue;
                    } else {
                        ret.push({
                            id: attrs[name][attributes[j]],
                            attr: attributes[j]
                        });
                    }
                }
                goods[i].attrs = ret;
            }

            if (sync) {
                await this.model.SyncModel.create({
                    user_id: user_id,
                    key: 'syncOrders',
                    value: JSON.stringify(order)
                }, {
                    transaction: transaction
                });
            }
        }

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
