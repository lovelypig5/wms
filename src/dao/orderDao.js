var Sequelize = require( 'sequelize' );
var BaseDao = require( './baseDao' ),
    goodDao = require( './goodDao' );

class OrderDao extends BaseDao {

    /**
     * create order
     * @method create
     * @param  {Number} user_id     : user id
     * @param  {Number} orderId     : order id
     * @param  {Number} expressId   : express id
     * @param  {Number} expressCost : express cost
     * @param  {String} name        : buyer
     * @param  {Double} price       : order price
     * @param  {List} goodList      : good list
     * @param  {String} comment     : comment
     * @return {Promise}
     */
    async create( transaction, user_id, orderId, expressId, expressCost, name, price, goodList, comment, expressDate ) {
        var data = {
            id: orderId,
            expressId: expressId,
            expressCost: expressCost,
            name: name,
            user_id: user_id,
            comment: comment,
            price: price
        };
        if ( expressDate ) {
            data.expressDate = expressDate;
        }

        var order = await this.model.Order.create( data, {
            transaction: transaction
        } );

        if ( order ) {
            for ( var i = 0; i < goodList.length; i++ ) {
                var _good = goodList[ i ];
                await goodDao.out( transaction, _good.id, _good.amount, price, _good.attr, user_id, orderId,
                    expressDate );
            }
            return this.ajaxModel( 200, '创建成功!' );
        }
    }

    /**
     * list order
     * @method list
     * @param  {Number} user_id  : user id
     * @param  {Number} page     : page index
     * @param  {Number} pageSize : page size
     * @return {Promise}
     */
    async list( user_id, page, pageSize ) {
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * ( page - 1 ) : 0;

        var result = await this.model.Order.findAndCountAll( {
            limit: limit,
            offset: offset,
            attributes: [
                [
                    Sequelize.fn( 'DATE_FORMAT', Sequelize.col( 'expressDate' ), '%Y-%m-%d' ),
                    'date'
                ],
                'id',
                'expressCost',
                'expressId',
                'name',
                'price',
                'comment',
                'expressDate'
            ],
            include: [ {
                model: this.model.Record,
                include: [ {
                    model: this.model.Good,
                    attributes: [ 'name' ],
                    where: {
                        user_id: user_id
                    }
                }, {
                    model: this.model.Attr,
                    through: {
                        attributes: []
                    }
                } ]
            } ],
            where: {
                user_id: user_id
            },
            order: [
                [ 'expressDate', 'DESC' ]
            ]
        } );

        return this.ajaxModel( 200, {
            count: result.count,
            content: result.rows
        } );
    }

    /**
     * order detail
     * @method orderDetail
     * @param  {Number} user_id  : user id
     * @param  {Number} order_id : order id
     * @return {Promise}
     */
    async orderDetail( user_id, order_id ) {
        var rows = await this.model.Record.findAll( {
            include: [ {
                model: this.model.Good,
                attributes: [ 'name' ],
                where: {
                    user_id: user_id
                }
            }, {
                model: this.model.Attr,
                through: {
                    attributes: []
                }
            } ],
            where: {
                order_id: order_id
            }
        } );
        return this.ajaxModel( 200, rows );
    }

    /**
     * [sync description]
     * @param  {[type]} user_id [description]
     * @param  {[type]} orders  [description]
     * @return {[type]}         [description]
     */
    async sync( transaction, user_id, orders ) {
        var rows = await goodDao.attrs( user_id );
        var names = {};
        var attrs = {};

        rows.ret.forEach( ( row ) => {
            var good = row.toJSON().goods[ 0 ];
            names[ good.name ] = good.id;

            if ( !attrs[ good.name ] ) {
                attrs[ good.name ] = {};
            }
            good.attrs.forEach( ( item ) => {
                attrs[ good.name ][ item.attr ] = item.id;
            } )
        } );

        var ids = [];
        orders.forEach( ( order ) => {
            ids.push( order.orderId );
        } )

        var existOrders = await this.model.SyncModel.findAll( {
            attributes: [ 'id' ],
            where: {
                id: {
                    $in: ids
                }
            }
        } );

        var existIds = [];
        existOrders.forEach( ( order ) => {
            existIds.push( order.id );
        } )

        orders = orders.filter( ( order ) => {
            if ( existIds.indexOf( order.orderId ) == -1 ) {
                return order;
            }
        } )

        for ( var t = 0; t < orders.length; t++ ) {
            var order = orders[ t ];
            let goods = order.goods;
            let sync = true;

            for ( var i = 0; i < goods.length; i++ ) {
                var good = goods[ i ];
                let name = good.name;
                let attributes = good.attrs;
                if ( !( goods[ i ].id = names[ name ] ) ) {
                    sync = false;
                    continue;
                };

                let ret = [];
                for ( var j = 0; j < attributes.length; j++ ) {
                    if ( !attrs[ name ][ attributes[ j ] ] ) {
                        sync = false;
                        continue;
                    } else {
                        ret.push( {
                            id: attrs[ name ][ attributes[ j ] ],
                            attr: attributes[ j ]
                        } );
                    }
                }
                goods[ i ].attrs = ret;
            }

            if ( sync ) {
                await this.model.SyncModel.create( {
                    id: order.orderId,
                    user_id: user_id,
                    key: 'syncOrders',
                    value: JSON.stringify( order ),
                    date: order.date
                }, {
                    transaction: transaction
                } );
            }
        }

        var msg = '解析成功!';
        if ( existIds.length > 0 ) {
            msg += '过滤掉已经存在的订单：' + existIds.join( ',' );
        }

        return this.ajaxModel( 200, msg );
    }

    /**
     * [synclist description]
     * @param  {[type]} user_id [description]
     * @return {[type]}         [description]
     */
    async synclist( user_id, page, pageSize ) {
        var limit = pageSize > 20 ? 20 : pageSize;
        var offset = page > 1 ? limit * ( page - 1 ) : 0;

        var result = await this.model.SyncModel.findAndCountAll( {
            limit: limit,
            offset: offset,
            where: {
                user_id: user_id
            },
            order: [
                [ 'date', 'DESC' ]
            ]
        } );
        return this.ajaxModel( 200, {
            count: result.count,
            content: result.rows
        } );
    }

    async doSync( transaction, user_id, orderId, expressId, expressCost, name, price, goodList, comment, expressDate ) {
        var order = await this.model.SyncModel.find( {
            where: {
                id: orderId
            }
        } );

        if ( order ) {
            if ( order.flag == 1 ) {
                return this.ajaxModel( 400, '该订单已经同步!' );
            }

            var value = JSON.parse( order.value );
            value.expressId = expressId;
            value.comment = comment;

            await this.model.SyncModel.update( {
                flag: 1,
                value: JSON.stringify( value )
            }, {
                transaction: transaction,
                where: {
                    id: orderId
                }
            } )

            await this.create( transaction, user_id, orderId, expressId, expressCost, name, price, goodList,
                comment, expressDate );

            return this.ajaxModel( 200, '同步成功!' );
        } else {
            return this.ajaxModel( 400, '不存在该订单!' );
        }
    }
}

module.exports = new OrderDao();
