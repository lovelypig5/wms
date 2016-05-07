var BaseApi = require('./baseApi');
var orderDao = require('../dao/orderDao');

class OrderApi extends BaseApi {

    create(req, res) {
        var user_id = req.session.user.id
        var body = req.body;
        var orderId = body.orderId;
        var expressId = body.expressId;
        var expressCost = body.expressCost;
        var name = body.receiveName;
        var price = body.price;
        if (!orderId || !expressId || !expressCost || !name || !price) {
            res.status(400).send('缺少参数');
        }
        orderId = parseInt(orderId);
        expressId = parseInt(expressId);
        expressCost = parseInt(expressCost);
        price = parseFloat(price);
        if (isNaN(orderId) || orderId <= 0 || isNaN(price) || price <= 0
                || isNaN(expressId) || expressId <= 0 || isNaN(expressCost) || expressCost <= 0) {
            res.status(400).send('参数格式错误');
        }
        var goodList = body.goodList;
        if (goodList && goodList.length > 0) {
            for (var i = 0; i < goodList.length; i++) {
                var good = goodList[i];
                var attr = good.attr || [];
                var amount = good.amount;
                if (!amount) {
                    res.status(400).send('缺少参数');
                }
                amount = parseInt(amount);
                if (isNaN(amount) || amount <= 0) {
                    res.status(400).send('参数格式错误');
                }
            }
        } else {
            res.status(400).send('该订单中没有包含商品');
        }

        orderDao.create(user_id, orderId, expressId, expressCost, name, price, goodList).then((order) => {
            res.status(order.status).json(order.ret);
        }, (order) => {
            res.status(order.status).send(order.ret);
        });
    }

    list(req, res) {
        var user_id = req.session.user.id;
        var query = req.query;
        var page = parseInt(query.page) || 1;
        var pageSize = parseInt(query.pageSize) || 20;

        orderDao.list(user_id, page, pageSize).then((order) => {
            res.status(order.status).json(order.ret);
        }, (order) => {
            res.status(order.status).send(order.ret);
        })
    }

}

var orderApi = new OrderApi();

module.exports = [{
    method: 'post',
    route: '/api/order/create',
    func: orderApi.create
}, {
    method: 'get',
    route: '/api/order/list',
    func: orderApi.list
}]