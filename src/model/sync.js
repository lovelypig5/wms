var Sequelize = require( 'sequelize' ),
    sequelize = require( '../db/sequelize' );

var Sync = sequelize.define( 'sync', {
    id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER( 11 )
    },
    key: {
        type: Sequelize.STRING( 255 )
    },
    value: {
        type: Sequelize.STRING( 4000 )
    },
    flag: {
        type: Sequelize.INTEGER( 1 )
    },
    date: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
} );

module.exports = Sync;
