var host = 'http://localhost:3000';
var base = '/api';
var api = {
    createGood: host + base + '/goods/create',
    searchGood: host + base + '/goods/search',
    addAttr: host + base + '/goods/attrs/add',
    goodsAttrs: host + base + '/goods/attrs',
    attrCombination: host + base + '/goods/attrlist',
    goodsIn: host + base + '/goods/in',
    goodsOut: host + base + '/goods/out',
    goodsDetail: host + base + '/goods/detail',
    goodList: host + base + '/goods',
    inList: host + base + '/goods/inList',
    outList: host + base + '/goods/inList',
    trend: host + base + '/goods/trend',

    user: host + '/user',
    isLogin: host + '/isLogin',
    login: host + '/login',
    logout: host + '/logout'
}

export default api;