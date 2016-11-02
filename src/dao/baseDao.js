var model = require('../model');
var logger = require('../logger'),
    MESSAGES = require('../config/message'),
    ERRORS = require('../error');

class BaseDao {

    constructor() {
        this.logger = logger;
        this.MESSAGES = MESSAGES;
        this.ERRORS = ERRORS;
        this.model = model;
    }

    ajaxModel(status, ret) {
        return {
            status: status,
            ret: ret
        };
    }
}

module.exports = BaseDao;
