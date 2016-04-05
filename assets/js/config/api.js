var base = '/wms';
var api = {
    createGood: base + '/api/goods/create',
    searchGood: base + '/api/goods/search',
    goodsAttrs: base + '/api/goods/attrs',
    goodsAttrlist: base + '/api/goods/attrlist',
    goodsIn: base + '/api/goods/in',
    goodsOut: base + '/api/goods/out',
    goodsDetail: base + '/api/goods/detail',
    goodList: base + '/api/goods',
    inList: base + '/api/goods/inList',
    outList: base + '/api/goods/inList',

    user: base + '/user',
    isLogin: base + '/isLogin',
    login: base + '/login',
    logout: base + '/logout'
}

export default api;