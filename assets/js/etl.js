( function () {
    var DICT = {
        '80ml美国外贸药瓶医用密封PP透明塑料瓶便携分装收纳药盒拇指瓶': '拇指瓶',
        '美国美剧安全塑料药瓶防儿童误食pp药盒旅行收纳分装瓶正反两用瓶': '两用瓶',
        '50ml特价创意医用密封透明pet螺旋塑料瓶定制分装瓶保健瓶小药瓶': '螺旋瓶',
        '60ml美国创意医用密封透明定制分装pp塑料瓶旅行收纳小药瓶安全瓶': '安全瓶'
    };
    var content = document.getElementById( 'sold_container' ).firstChild.children[ 5 ].innerText;

    var form = document.createElement( "form" );
    document.body.appendChild( form );
    form.method = 'post';
    form.action = 'http://wms.out2man.com/api/order/sync';
    form.target = '_blank';
    var newElement = document.createElement( "input" );
    newElement.setAttribute( "name", "content" );
    newElement.setAttribute( "type", "hidden" );
    newElement.setAttribute( "value", escape( content ) );
    form.appendChild( newElement );
    form.submit();
} )()
