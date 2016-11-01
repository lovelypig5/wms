var bodyParser = require('body-parser');

module.exports = [{
    filter: bodyParser.urlencoded({
        extended: false
    })
}, {
    filter: bodyParser.json()
}];
