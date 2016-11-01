var Service = require('./service');
var orderDao = require('../dao/orderDao');

class OrderService extends Service {

    create(user_id, orderId, expressId, expressCost, name, price, goodList, comment) {
        return this.db.transaction((transaction) => {
            orderDao.create(transaction, user_id, orderId, expressId, expressCost, name, price, goodList,
                comment);
        });
    }

    list(user_id, page, pageSize) {
        return orderDao.list(user_id, page, pageSize);
    }

    orderDetail(user_id, order_id) {
        return orderDao.orderDetail(user_id, order_id);
    }

}

module.exports = new OrderService();
