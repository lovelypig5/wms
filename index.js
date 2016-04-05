var express = require('express');
var fallback = require('express-history-api-fallback');
var logger = require('./src/logger');
var filters = require('./src/filters');
var routes = require('./src/route');
var apis = require('./src/api');

var app = express();

filters.forEach((filter) => {
    if (filter.route) {
        app.all(filter.route, filter.filter);
    } else {
        app.use(filter.filter);
    }
})
routes.forEach((route) => {
    app.use(route.route, route.router);
})
apis.forEach((api) => {
    var method = api.method || 'get';
    app[method](api.route, api.func);
})

app.use(express.static('assets/dist'));
// history api fallback
app.use(fallback('fallback.html', {
    root: `${__dirname}/assets`
}));

app.listen(3000, function() {
    logger.info(`Backend service listening on port 3000!`);
});