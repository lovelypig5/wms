var host = '';
var base = host + '/api';
var api = {
    createGood: base + '/goods/create',
    searchGood: base + '/goods/search',
    goodsAttrs: base + '/goods/attrs',
    goodsAttrlist: base + '/goods/attrlist',
    goodsIn: base + '/goods/in',
    goodsOut: base + '/goods/out',
    goodsDetail: base + '/goods/detail',
    goodList: base + '/goods',
    inList: base + '/goods/inList',
    outList: base + '/goods/inList',

    user: host + '/user',
    isLogin: host + '/isLogin',
    login: host + '/login',
    logout: host + '/logout'
}

export default api;