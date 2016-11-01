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
        if (!req.session.user) {
            res.status(401).send('请先登录!');
        } else {
            next();
        }
    }
}]
