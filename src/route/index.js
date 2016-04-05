var express = require('express');
var router = express.Router();
var logger = require('../logger');

router.use(function(req, res, next) {
    logger.info('%s %s %s', req.method, req.url, req.path);
    next();
});

var deps = [];
var ret = [{
    router: router,
    route: '/'
}];
deps.forEach((dep) => {
    ret.push(require(dep));
})

module.exports = ret;