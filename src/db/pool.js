var mysql = require('mysql');
var logger = require('../logger');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'wms'
});

process.on('exit', (code) => {
    pool.end();
    logger.info(`system exit with code ${code}`);
})

module.exports = pool;