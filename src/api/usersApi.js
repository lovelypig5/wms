var BaseApi = require('./baseApi');
var userDao = require('../dao/userDao');
var TokenStore = require('../tokenStore');

class UserApi extends BaseApi {

    login(req, res) {
        var body = req.body;
        var userName = body.userName;
        var password = body.password;
        if (!userName || !password) {
            return res.status(400).send('缺少参数');
        }

        userDao.login(userName, password).then((user) => {
            var result = user.ret.toJSON();
            var token = result.id + '' + Date.now();
            result.token = token;
            req.session.user = result;
            TokenStore.addToken(token, result);
            res.status(user.status).json(result);
        }, (err) => {
            var model = super.handleErr(err);
            res.status(model.status).send(model.ret);
        });
    }

    logout(req, res) {
        req.session.user = null;
        var token = req.headers.accesstoken;
        if (token) {
            TokenStore.deleteToken(token);
        }
        res.status(200).send({});
    }

    user(req, res) {
        res.status(200).json(req.session.user || {});
    }

    isLogin(req, res) {
        if (req.session.user) {
            res.status(200).json(req.session.user);
        } else {
            res.status(401).send('没有登录');
        }
    }
}

var userApi = new UserApi();

module.exports = [{
    method: 'post',
    route: '/login',
    func: userApi.login
}, {
    method: 'post',
    route: '/logout',
    func: userApi.logout
}, {
    method: 'get',
    route: '/user',
    func: userApi.user
}, {
    method: 'get',
    route: '/isLogin',
    func: userApi.isLogin
}]
