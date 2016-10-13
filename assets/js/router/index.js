import Router from 'vue-router';
import API from '../config/api';

Vue.use(Router);

var router;
var routes = [{
    path: '/',
    component(resolve) {
        require(['../features/home/index.vue'], resolve);
    }
}, {
    path: '/home',
    component(resolve) {
        require(['../features/home/index.vue'], resolve);
    }
}, {
    path: '/goods',
    component(resolve) {
        require(['../features/goods/index.vue'], resolve);
    },
    children: [{
        path: '/',
        component(resolve) {
            require(['../features/goods/analysis.vue'], resolve);
        }
    }, {
        path: '/analysis',
        component(resolve) {
            require(['../features/goods/analysis.vue'], resolve);
        }
    }, {
        path: '/list',
        component(resolve) {
            require(['../features/goods/goodList.vue'], resolve);
        }
    }, {
        path: '/create',
        component(resolve) {
            require(['../features/goods/create.vue'], resolve);
        }
    }, {
        path: '/in',
        component(resolve) {
            require(['../features/goods/in.vue'], resolve);
        }
    }, {
        path: '/out',
        component(resolve) {
            require(['../features/goods/out.vue'], resolve);
        }
    }, {
        path: '/inList',
        component(resolve) {
            require(['../features/goods/inList.vue'], resolve);
        }
    }, {
        path: '/outList',
        component(resolve) {
            require(['../features/goods/outList.vue'], resolve);
        }
    }, {
        path: '/detail/:id',
        name: 'detail',
        component(resolve) {
            require(['../features/goods/detail.vue'], resolve);
        }
    }, {
        path: '/attr/:id',
        name: 'good-attr',
        component(resolve) {
            require(['../features/goods/goodAttr.vue'], resolve);
        }
    }]
}, {
    path: 'order',
    component(resolve) {
        require(['../features/order/index.vue'], resolve);
    },
    children: [{
        path: '/',
        component(resolve) {
            require(['../features/order/list.vue'], resolve);
        }
    }, {
        path: '/list',
        component(resolve) {
            require(['../features/order/list.vue'], resolve);
        }
    }, {
        path: '/create',
        component(resolve) {
            require(['../features/order/create.vue'], resolve);
        }
    }]
}];
if (WEBPACK_DEBUG) {
    router = new Router(routes);
} else {
    router = new Router({
        mode: 'history',
        routes: routes
    });
}

export default router;
