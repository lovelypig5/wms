var logger = require('../logger'),
    MESSAGES = require('../config/message'),
    ERRORS = require('../error');

var ajaxModel = (status, ret) => {
    return {
        status: status,
        ret: ret
    };
}

class BaseApi {

    ajaxModel(status, ret) {
        return {
            status: status,
            ret: ret
        };
    }

    handleErr(err) {
        logger.error(err);

        if (err instanceof ERRORS.NotFound) {
            return ajaxModel(400, err.message);
        }
        if (err instanceof ERRORS.Exist) {
            return ajaxModel(400, err.message);
        }
        if (err instanceof ERRORS.NotEnough) {
            return ajaxModel(400, err.message);
        }
        if (err instanceof ERRORS.DataError) {
            return ajaxModel(200, err.message);
        }

        return ajaxModel(500, MESSAGES.SERVER_ERROR);
    }
}

module.exports = BaseApi;
