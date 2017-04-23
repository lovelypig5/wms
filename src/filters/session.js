var TokenStore = require('../tokenStore');
var session = require('cookie-session');

module.exports = [{
    filter: session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        genid: (req) => {
            return Date.now() * 10000 + parseInt(Math.random(10000) * 10000)
        },
        maxAge: 28800000
    })
}, {
    route: '/api/*',
    filter(req, res, next) {
        var headers = req.headers;
        var token = headers.accesstoken;
        if (!req.session.user && !TokenStore.hasToken(token)) {
            res.status(401).send('请先登录!');
        } else {
            if (!req.session.user) {
                var user = TokenStore.getUser(token);
                req.session.user = user;
            }
            next();
        }
    }
}]
