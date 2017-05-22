( function () {
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
