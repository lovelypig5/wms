var BaseApi = require('./baseApi');
var goodsDao = require('../dao/goodsDao');

class GoodsApi extends BaseApi {

    list(req, res) {
        var user_id = req.session.user.id;
        var query = req.query;
        var page = parseInt(query.page) || 1;
        var pageSize = parseInt(query.pageSize) || 20;

        goodsDao.list(user_id, page, pageSize).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        });
    }

    inlist(req, res) {
        var user_id = req.session.user.id
        var query = req.query;
        var page = parseInt(query.page) || 1;
        var pageSize = parseInt(query.pageSize) || 20;
        var type = parseInt(query.type) || 0;

        goodsDao.inlist(user_id, type, page, pageSize).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        });
    }

    create(req, res) {
        var user_id = req.session.user.id
        var body = req.body;
        var name = body.name;
        var attr = body.attr || [];
        if (!name) {
            res.status(500).send('缺少参数');
            return
        }
        goodsDao.create(name, attr, user_id).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        });
    }

    in(req, res) {
        var user_id = req.session.user.id
        var body = req.body;
        var id = body.id;
        var amount = body.amount;
        var attr = body.attr || [];
        var price = body.priceIn;
        if (!id || !amount || !price) {
            res.status(500).send('缺少参数');
        }
        amount = parseInt(amount);
        price = parseFloat(price);
        if (isNaN(amount) || amount <= 0 || isNaN(price) || price <= 0) {
            res.status(500).send('参数格式错误');
        }

        goodsDao.in(id, amount, price, attr.join(','), user_id).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        });
    }

    out(req, res) {
        var user_id = req.session.user.id
        var body = req.body;
        var id = body.id;
        var amount = body.amount;
        var attr = body.attr;
        var price = body.priceOut;
        if (!id || !amount || !price) {
            res.status(500).send('缺少参数');
        }
        amount = parseInt(amount);
        price = parseFloat(price);
        if (isNaN(amount) || amount <= 0 || isNaN(price) || price <= 0) {
            res.status(500).send('参数格式错误');
        }

        goodsDao.out(id, amount, price, attr, user_id).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        });
    }

    detail(req, res) {
        var user_id = req.session.user.id
        var query = req.query;
        var id = query.id;
        if (!id) {
            res.status(500).send('缺少参数');
        }

        id = parseInt(id);
        if (isNaN(id)) {
            res.status(500).send('参数错误');
        }

        goodsDao.detail(id, user_id).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        })
    }

    search(req, res) {
        var user_id = req.session.user.id;
        var query = req.query;
        var name = query.name
        if (!name) {
            name = '';
        }

        goodsDao.search(user_id, name).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        })
    }

    attrs(req, res) {
        var user_id = req.session.user.id;
        var query = req.query;
        var good_id = query.good_id;
        if (!good_id) {
            res.status(500).send('缺少参数');
        }

        goodsDao.attrs(user_id, good_id).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        })
    }

    attrlist(req, res) {
        var user_id = req.session.user.id;
        var query = req.query;
        var good_id = query.good_id;
        if (!good_id) {
            res.status(500).send('缺少参数');
        }

        goodsDao.attrlist(user_id, good_id).then((goods) => {
            res.status(goods.status).json(goods.ret);
        }, (goods) => {
            res.status(goods.status).send(goods.ret);
        })
    }
}

var goodsApi = new GoodsApi();

module.exports = [{
    method: 'get',
    route: '/api/goods',
    func: goodsApi.list
}, {
    method: 'get',
    route: '/api/goods/inlist',
    func: goodsApi.inlist
}, {
    method: 'post',
    route: '/api/goods/create',
    func: goodsApi.create
}, {
    method: 'post',
    route: '/api/goods/in',
    func: goodsApi.in
}, {
    method: 'post',
    route: '/api/goods/out',
    func: goodsApi.out
}, {
    method: 'get',
    route: '/api/goods/detail',
    func: goodsApi.detail
}, {
    method: 'get',
    route: '/api/goods/search',
    func: goodsApi.search
}, {
    method: 'get',
    route: '/api/goods/attrs',
    func: goodsApi.attrs
}, {
    method: 'get',
    route: '/api/goods/attrlist',
    func: goodsApi.attrlist
}]