var Service = require('./service');
var goodDao = require('../dao/goodDao');

class GoodService extends Service {

    search(user_id, name) {
        return goodDao.search(user_id, name);
    }

    list(user_id) {
        return goodDao.list(user_id);
    }

    detail(id, user_id) {
        return goodDao.detail(id, user_id);
    }

    create(name, attrs, user_id) {
        return this.db.transaction((transaction) => {
            return goodDao.create(transaction, name, attrs, user_id);
        });
    }

    modify(record_id, amount, price, user_id) {
        return this.db.transaction((transaction) => {
            return goodDao.modify(transaction, record_id, amount, price, user_id);
        });
    }

    inlist(user_id, type, page, pageSize) {
        return goodDao.inlist(user_id, type, page, pageSize);
    }

    out(id, amount, price, attr, user_id, order_id) {
        return this.db.transaction((transaction) => {
            return goodDao.out(transaction, id, amount, price, attr, user_id, order_id);
        });
    }

    in (id, amount, price, attrs, user_id) {
        return this.db.transaction((transaction) => {
            return goodDao.in(transaction, id, amount, price, attrs, user_id);
        });
    }

    attrs(user_id, good_id) {
        return goodDao.attrs(user_id, good_id);
    }

    addAttr(user_id, good_id, attr) {
        return this.db.transaction((transaction) => {
            return goodDao.addAttr(user_id, good_id, attr);
        });
    }

    attrlist(user_id, good_id) {
        return goodDao.attrlist(user_id, good_id);
    }

    trend(user_id, good_id, attr) {
        return goodDao.trend(user_id, good_id, attr);
    }

}

module.exports = new GoodService();
