var Sequelize = require('sequelize');
var logger = require('../logger');

var sequelize = new Sequelize('wms', 'root', 'root', {
    connectionLimit: 10,
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;
