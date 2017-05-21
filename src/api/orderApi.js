var BaseApi = require( './baseApi' );
var orderService = require( '../service/orderService' );

const DICT = {
    '80ml美国外贸药瓶医用密封PP透明塑料瓶便携分装收纳药盒拇指瓶': '拇指瓶',
    '美国美剧安全塑料药瓶防儿童误食pp药盒旅行收纳分装瓶正反两用瓶': '两用瓶',
    '50ml特价创意医用密封透明pet螺旋塑料瓶定制分装瓶保健瓶小药瓶': '螺旋瓶',
    '60ml美国创意医用密封透明定制分装pp塑料瓶旅行收纳小药瓶安全瓶': '安全瓶'
};

class OrderApi extends BaseApi {

    create( req, res ) {
        var user_id = req.session.user.id;
        var body = req.body;
        var orderId = body.orderId;
        var expressId = body.expressId;
        var expressCost = body.expressCost;
        var name = body.receiveName;
        var price = body.price;
        var comment = body.comment;
        if ( !orderId || !expressId || !expressCost || !name || !price ) {
            return res.status( 400 ).send( '缺少参数' );
        }
        orderId = parseInt( orderId );
        expressId = parseInt( expressId );
        expressCost = parseInt( expressCost );
        price = parseFloat( price );
        if ( isNaN( orderId ) || orderId <= 0 || isNaN( price ) || price <= 0 || isNaN( expressId ) || expressId <=
            0 || isNaN( expressCost ) || expressCost < 0 ) {
            return res.status( 400 ).send( '参数格式错误' );
        }
        var goodList = body.goodList;
        if ( goodList && goodList.length > 0 ) {
            for ( var i = 0; i < goodList.length; i++ ) {
                var good = goodList[ i ];
                var attr = good.attr || "";
                var amount = good.amount;
                if ( !amount ) {
                    return res.status( 400 ).send( '缺少参数' );
                }
                amount = parseInt( amount );
                if ( isNaN( amount ) || amount <= 0 ) {
                    return res.status( 400 ).send( '参数格式错误' );
                }
            }
        } else {
            return res.status( 400 ).send( '该订单中没有包含商品' );
        }

        orderService.create( user_id, orderId, expressId, expressCost, name, price, goodList, comment ).then( (
            order ) => {
            res.status( order.status ).json( order.ret );
        }, ( err ) => {
            var model = super.handleErr( err );
            res.status( model.status ).send( model.ret );
        } );
    }

    list( req, res ) {
        var user_id = req.session.user.id;
        var query = req.query;
        var page = parseInt( query.page ) || 1;
        var pageSize = parseInt( query.pageSize ) || 20;

        orderService.list( user_id, page, pageSize ).then( ( order ) => {
            res.status( order.status ).json( order.ret );
        }, ( err ) => {
            var model = super.handleErr( err );
            res.status( model.status ).send( model.ret );
        } );
    }

    orderDetail( req, res ) {
        var user_id = req.session.user.id;
        var query = req.query;
        var order_id = query.order_id;
        if ( !order_id ) {
            return res.status( 400 ).send( '缺少参数' );
        }

        orderService.orderDetail( user_id, order_id ).then( ( order ) => {
            res.status( order.status ).json( order.ret );
        }, ( err ) => {
            var model = super.handleErr( err );
            res.status( model.status ).send( model.ret );
        } );
    }

    sync( req, res ) {
        var user_id = req.session.user.id;
        try {
            var content = unescape( req.body.content );
            var results = content.match( /订单号([^订单号]+)/g );
            var orders = [];

            results.forEach( ( order ) => {
                if ( order.indexOf( '卖家已发货' ) == -1 ) {
                    return;
                }
                order = order.replace( /详情|延长收货时间|卖家已发货/g, '' ).replace( /\n{2,10}/g, '\n' );
                order.match(
                    /订单号[:|：] (\d*)成交时间[:|：] ([\d-:\W]*)\t\n([\u4e00-\u9fa5\da-zA-Z]*)\n([\u4e00-\u9fa5|\d|a-zA-Z：]*)\n￥[.\d]*\n([.\d]*)\n([\u4e00-\u9fa5\d\D]*)\n￥([.\d]*)\n\(含快递[:|：]￥([ .\d]*)\)\n查看物流\n([\u4e00-\u9fa5\d\D]*)/
                )
                var goods = [];
                var ret = {
                    orderId: RegExp.$1,
                    date: RegExp.$2,
                    name: RegExp.$6,
                    expressPrice: RegExp.$8,
                    price: RegExp.$7
                }

                var name = RegExp.$3;
                var attr = RegExp.$4;
                var other = RegExp.$9;
                var amount = RegExp.$5;

                if ( DICT[ name ] ) {
                    var attrs = attr.split( /颜色分类[:|：]|容量[:|：]/g );
                    attrs.splice( 0, 1 );
                    goods.push( {
                        name: DICT[ name ],
                        attrs: attrs,
                        amount: amount
                    } )
                }
                if ( other ) {
                    var temp = other.replace( /\n\n/g, '\n' ).split( /\n/g );
                    if ( temp.length % 4 == 1 ) {
                        for ( var i = 0; i < Math.floor( temp.length / 4 ); i++ ) {
                            var name = DICT[ temp[ i * 4 ] ];
                            if ( !name ) {
                                continue;
                            } else {
                                var attrs = temp[ i * 4 + 1 ].split( /颜色分类[:|：]|容量[:|：]/g );
                                attrs.splice( 0, 1 );
                                goods.push( {
                                    name: name,
                                    attrs: attrs,
                                    amount: temp[ i * 4 + 3 ]
                                } )
                            }
                        }
                    }
                }
                if ( goods.length > 0 ) {
                    ret.goods = goods;
                    orders.push( ret );
                }
            } )
            orderService.sync( user_id, orders ).then( ( result ) => {
                res.status( result.status ).send( '解析成功' );
            }, ( err ) => {
                var model = super.handleErr( err );
                res.status( model.status ).send( model.ret );
            } );
        } catch ( e ) {
            res.status( 400 ).send( '解析失败！' );
        }
    }

    syncList( req, res ) {
        orderService.synclist( req.session.user.id ).then( ( list ) => {
            res.status( list.status ).json( list.ret );
        }, ( err ) => {
            var model = super.handleErr( err );
            res.status( model.status ).send( model.ret );
        } )
    }

    doSync( req, res ) {
        var user_id = req.session.user.id;
        var body = req.body;
        var orderId = body.orderId;
        var expressId = body.expressId;
        var expressCost = body.expressCost;
        var name = body.receiveName;
        var price = body.price;
        var comment = body.comment;
        if ( !orderId || !expressId || !expressCost || !name || !price ) {
            return res.status( 400 ).send( '缺少参数' );
        }
        expressId = parseInt( expressId );
        expressCost = parseInt( expressCost );
        price = parseFloat( price );
        if ( isNaN( orderId ) || orderId <= 0 || isNaN( price ) || price <= 0 || isNaN( expressId ) || expressId <=
            0 || isNaN( expressCost ) || expressCost < 0 ) {
            return res.status( 400 ).send( '参数格式错误' );
        }
        var goodList = body.goodList;
        if ( goodList && goodList.length > 0 ) {
            var goods = [];
            for ( var i = 0; i < goodList.length; i++ ) {
                var good = goodList[ i ];
                var amount = good.amount;
                if ( !amount ) {
                    return res.status( 400 ).send( '缺少参数' );
                }
                amount = parseInt( amount );
                if ( isNaN( amount ) || amount <= 0 ) {
                    return res.status( 400 ).send( '参数格式错误' );
                }
                var attr = [];
                good.attrs.forEach( ( a ) => {
                    attr.push( a.id );
                } )
                good.attr = attr.sort().join( ',' );
                goods.push( good );
            }
        } else {
            return res.status( 400 ).send( '该订单中没有包含商品' );
        }

        orderService.doSync( user_id, orderId, expressId, expressCost, name, price, goods, comment ).then( (
            list ) => {
            res.status( list.status ).json( list.ret );
        }, ( err ) => {
            var model = super.handleErr( err );
            res.status( model.status ).send( model.ret );
        } )
    }
}

var orderApi = new OrderApi();

module.exports = [ {
    method: 'post',
    route: '/api/order/create',
    func: orderApi.create
}, {
    method: 'get',
    route: '/api/order/list',
    func: orderApi.list
}, {
    method: 'get',
    route: '/api/order/detail',
    func: orderApi.orderDetail
}, {
    method: 'post',
    route: '/api/order/sync',
    func: orderApi.sync
}, {
    method: 'get',
    route: '/api/order/synclist',
    func: orderApi.syncList
}, {
    method: 'post',
    route: '/api/order/doSync',
    func: orderApi.doSync
} ];
