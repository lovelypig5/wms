var BaseApi = require('./baseApi');
var userDao = require('../dao/userDao');

class UserApi extends BaseApi {
    login(req, res) {
        var body = req.body;
        var userName = body.userName;
        var password = body.password;
        if (!userName || !password) {
            res.status(500).send('缺少参数');
            return
        }
        userDao.login(userName, password).then((user) => {
            req.session.user = user.ret;
            res.status(user.status).json(user.ret);
        }, (user) => {
            res.status(user.status).send(user.ret);
        });
    }
    logout(req, res) {
        req.session.user = null;
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