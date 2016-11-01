var BaseApi = require('./baseApi');
var orderService = require('../service/orderService');

class OrderApi extends BaseApi {

    create(req, res) {
        var user_id = req.session.user.id;
        var body = req.body;
        var orderId = body.orderId;
        var expressId = body.expressId;
        var expressCost = body.expressCost;
        var name = body.receiveName;
        var price = body.price;
        var comment = body.comment;
        if (!orderId || !expressId || !expressCost || !name || !price) {
            res.status(400).send('缺少参数');
        }
        orderId = parseInt(orderId);
        expressId = parseInt(expressId);
        expressCost = parseInt(expressCost);
        price = parseFloat(price);
        if (isNaN(orderId) || orderId <= 0 || isNaN(price) || price <= 0 ||
            isNaN(expressId) || expressId <= 0 || isNaN(expressCost) || expressCost < 0) {
            return res.status(400).send('参数格式错误');
        }
        var goodList = body.goodList;
        if (goodList && goodList.length > 0) {
            for (var i = 0; i < goodList.length; i++) {
                var good = goodList[i];
                var attr = good.attr || "";
                var amount = good.amount;
                if (!amount) {
                    return res.status(400).send('缺少参数');
                }
                amount = parseInt(amount);
                if (isNaN(amount) || amount <= 0) {
                    return res.status(400).send('参数格式错误');
                }
            }
        } else {
            return res.status(400).send('该订单中没有包含商品');
        }

        orderService.create(user_id, orderId, expressId, expressCost, name, price, goodList, comment).then((order) => {
            res.status(order.status).json(order.ret);
        }, (err) => {
            var model = super.handleErr(err);
            res.status(model.status).send(model.ret);
        });
    }

    list(req, res) {
        var user_id = req.session.user.id;
        var query = req.query;
        var page = parseInt(query.page) || 1;
        var pageSize = parseInt(query.pageSize) || 20;

        orderService.list(user_id, page, pageSize).then((order) => {
            res.status(order.status).json(order.ret);
        }, (err) => {
            var model = super.handleErr(err);
            res.status(model.status).send(model.ret);
        });
    }

    orderDetail(req, res) {
        var user_id = req.session.user.id;
        var query = req.query;
        var order_id = query.order_id;
        if (!order_id) {
            return res.status(400).send('缺少参数');
        }

        orderService.orderDetail(user_id, order_id).then((order) => {
            res.status(order.status).json(order.ret);
        }, (err) => {
            var model = super.handleErr(err);
            res.status(model.status).send(model.ret);
        });
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
}, {
    method: 'get',
    route: '/api/order/detail',
    func: orderApi.orderDetail
}];
