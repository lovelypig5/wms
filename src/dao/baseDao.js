var Promise = require('promise');
var async = require('async');
var pool = require('../db/pool');
var logger = require('../logger');

class BaseDao {
    /**
     * query object
     * @param  {Object Query} querys :
     *   Query : {
     *       sql : sql query,
     *       params: paramas to pass to query, a list or string
     *       parse: parse sql query results,
     *       transaction: false
     *   }
     * @return {Promise}
     */
    query(...querys) {
        return new Promise((resolve, reject) => {
            var waterfall = [
                (callback) => {
                    pool.getConnection((err, connection) => {
                        callback(err, connection, {});
                    })
                }
            ];

            this.generateWaterfall(waterfall, querys);

            async.waterfall(waterfall, (err, connection, data) => {
                connection.release();
                if (err) {
                    reject(this.model(500, this.getErr(err)));
                    logger.error(err);
                    return;
                }

                resolve(this.model(200, data));
            });
        })
    }

    /**
     * see also query, but will begin with a transaction
     * @param  {...[type]} querys [description]
     * @return {[type]}           [description]
     */
    queryWithTransaction(...querys) {
        return new Promise((resolve, reject) => {
            var waterfall = [
                (callback) => {
                    pool.getConnection((err, connection) => {
                        callback(err, connection);
                    })
                },
                (connection, callback) => {
                    connection.beginTransaction((err) => {
                        callback(err, connection, {})
                    })
                }
            ];

            this.generateWaterfall(waterfall, querys);

            let successHandler = (err, connection, data) => {
                connection.commit((err) => {
                    if (err) {
                        errHandler(err, connection);
                        return;
                    }
                    resolve(this.model(200, data));
                    connection.release();
                });
            }

            let errHandler = (err, connection, data) => {
                if (err) {
                    if (err !== true) {
                        reject(this.model(500, this.getErr(err)));
                        connection.rollback((err) => {
                            connection.release();
                            if (err) {
                                throw err;
                            }
                        });
                        logger.error(err);
                    } else {
                        delete data.error;
                        successHandler(err, connection, data);
                    }
                }
            }

            async.waterfall(waterfall, (err, connection, data) => {
                if (err) {
                    return errHandler(err, connection, data);
                }
                return successHandler(err, connection, data);
            });
        })
    }

    generateWaterfall(waterfall, querys) {
        querys.forEach((query) => {
            let w = (connection, data, callback) => {
                if (query.sql && typeof query.sql == 'function') {
                    query.sql = query.sql(data);
                }
                if (query.params && typeof query.params == 'function') {
                    query.params = query.params(data);
                }

                logger.debug('-----------------------------');
                logger.debug('sql: ' + query.sql);
                logger.debug(query.params);

                connection.query(query.sql, query.params || null, (err, rows) => {
                    let r = rows;
                    if (query.parse && typeof query.parse == 'function') {
                        r = query.parse(rows, data);
                    }

                    // 数据逻辑中存在的错误情况，如数据已存在，非法数据等
                    if (r && r.error) {
                        callback(r.error, connection, r);
                    } else {
                        callback(err, connection, r);
                    }
                });
            }
            waterfall.push(w);
        })
    }

    model(status, ret) {
        return {
            status: status,
            ret: ret
        }
    }

    getErr(err) {
        if (Object.prototype.toString.call(err) == '[object Error]') {
            return '';
        } else if (Object.prototype.toString.call(err) == '[object String]') {
            return err;
        }

        return '未知错误';
    }
}

module.exports = BaseDao;