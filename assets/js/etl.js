(function() {
    var orders = document.getElementsByClassName('trade-order-main');
    var results = [];
    for (var i = 0; i < orders.length; i++) {
        var obj = {};
        var order = orders[i];
        var tables = order.getElementsByTagName('table');
        var titleItem = tables[0];

        var spans = tables[0].getElementsByTagName('td')[0].getElementsByTagName('span');
        obj.orderId = spans[2].innerHTML;
        obj.date = spans[5].innerHTML;
        obj.goods = [];

        var goods = tables[1].getElementsByTagName('tr');
        for (var j = 0; j < goods.length; j++) {
            var item = goods[j];
            var ret = [];
            var attrs = item.getElementsByClassName('production-mod__sku-item___3s6lG');
            var tds = item.getElementsByClassName('sol-mod__no-br___toLPG');
            var good = tds[0].getElementsByTagName('p')[0].getElementsByTagName('span')[1];
            var amount = tds[2].getElementsByTagName('p')[0];

            for (var k = 0; k < attrs.length; k++) {
                var attr = attrs[k].getElementsByTagName('span')[2];
                ret.push(attr.innerHTML);
            }

            obj.goods.push({name: good.innerHTML, amount: amount.innerHTML, attrs: ret})
        }

        results.push(obj);
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
