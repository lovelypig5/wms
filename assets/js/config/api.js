var base = '/api';
var api = {
    createGood: base + '/goods/create',
    searchGood: base + '/goods/search',
    addAttr: base + '/goods/attrs/add',
    goodsAttrs: base + '/goods/attrs',
    attrCombination: base + '/goods/attrlist',
    goodsIn: base + '/goods/in',
    goodsOut: base + '/goods/out',
    goodsDetail: base + '/goods/detail',
    goodList: base + '/goods',
    inList: base + '/goods/inList',
    outList: base + '/goods/inList',
    trend: base + '/goods/trend',
    modifyInOut: base + '/goods/modifyInOut',

    user: '/user',
    isLogin: '/isLogin',
    login: '/login',
    logout: '/logout'
}

export default api;