(function() {
    var DICT = {
        '80ml美国外贸药瓶医用密封PP透明塑料瓶便携分装收纳药盒拇指瓶': '拇指瓶',
        '美国美剧安全塑料药瓶防儿童误食pp药盒旅行收纳分装瓶正反两用瓶': '两用瓶',
        '50ml特价创意医用密封透明pet螺旋塑料瓶定制分装瓶保健瓶小药瓶': '螺旋瓶',
        '60ml美国创意医用密封透明定制分装pp塑料瓶旅行收纳小药瓶安全瓶': '安全瓶'
    };
    var orders = document.getElementsByClassName('trade-order-main');
    var results = [];
    for (var i = 0; i < orders.length; i++) {
        var obj = {};
        var order = orders[i];
        var tables = order.getElementsByTagName('table');
        var titleItem = tables[0];

        var spans = tables[0].getElementsByTagName('td')[0].getElementsByTagName('span');
        var goods = tables[1].getElementsByTagName('tr');
        var outTds = goods[0].getElementsByTagName('td');
        var price = outTds[6].getElementsByClassName('price-mod__price___3Un7c')[0].getElementsByTagName('span')[1];
        var expressPrice = outTds[6].getElementsByTagName('span')[3];
        var buyer = outTds[4].getElementsByClassName('buyer-mod__buyer___3NRwJ')[0].getElementsByTagName('a')[0];
        obj.orderId = spans[2].innerHTML;
        obj.name = buyer.innerHTML;
        obj.date = spans[5].innerHTML;
        obj.goods = [];
        obj.expressPrice = Number(expressPrice.innerHTML.replace(/[^0-9.]/g, ''));
        obj.price = Number(price.innerHTML) - obj.expressPrice;

        for (var j = 0; j < goods.length; j++) {
            var item = goods[j];
            var ret = [];
            var attrs = item.getElementsByClassName('production-mod__sku-item___3s6lG');
            var tds = item.getElementsByTagName('td');
            var good = tds[0].getElementsByTagName('p')[0].getElementsByTagName('span')[1];
            var amount = tds[2].getElementsByTagName('p')[0];

            for (var k = 0; k < attrs.length; k++) {
                var attr = attrs[k].getElementsByTagName('span')[2];
                ret.push(attr.innerHTML);
            }

            var name = DICT[good.innerHTML];
            if (name) {
                obj.goods.push({
                    name: name,
                    amount: amount.innerHTML,
                    attrs: ret
                })
            }
        }

        if (obj.goods.length > 0) {
            results.push(obj);
        }
    }

    var form = document.createElement("form");
    document.body.appendChild(form);
    form.method = 'post';
    form.action = 'http://localhost:9000/api/order/sync';
    form.target = '_blank';
    var newElement = document.createElement("input");
    newElement.setAttribute("name", "orders");
    newElement.setAttribute("type", "hidden");
    newElement.setAttribute("value", escape(JSON.stringify(results)));
    form.appendChild(newElement);
    form.submit();
})()
