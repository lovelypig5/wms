var sequelize = require('../db/sequelize');

class Service {

    constructor() {
        this.db = sequelize;
    }

}

module.exports = Service;
