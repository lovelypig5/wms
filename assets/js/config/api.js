var base = '/api';
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

    user: '/user',
    isLogin: '/isLogin',
    login: '/login',
    logout: '/logout'
}

export default api;