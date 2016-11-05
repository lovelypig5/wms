import Router from 'vue-router';
import API from '../config/api';

Vue.use(Router);

var router;
if (WEBPACK_DEBUG) {
    router = new Router();
} else {
    router = new Router({
        history: true
    });
}

router.map({
    '/login': {
        component(resolve) {
            require(['../features/login.vue'], resolve);
        }
    },
    '/': {
        component(resolve) {
            require(['../features/home/index.vue'], resolve);
        }
    },
    '/home': {
        component(resolve) {
            require(['../features/home/index.vue'], resolve);
        }
    },
    '/goods': {
        component(resolve) {
            require(['../features/index.vue'], resolve);
        },
        subRoutes: {
            '/': {
                component(resolve) {
                    require(['../features/goods/index.vue'], resolve);
                }
            },
            '/list': {
                component(resolve) {
                    require(['../features/goods/goodList.vue'], resolve);
                }
            },
            '/create': {
                component(resolve) {
                    require(['../features/goods/create.vue'], resolve);
                }
            },
            '/in': {
                component(resolve) {
                    require(['../features/goods/in.vue'], resolve);
                }
            },
            '/out': {
                component(resolve) {
                    require(['../features/goods/out.vue'], resolve);
                }
            },
            '/inList': {
                component(resolve) {
                    require(['../features/goods/inList.vue'], resolve);
                }
            },
            '/outList': {
                component(resolve) {
                    require(['../features/goods/outList.vue'], resolve);
                }
            },
            '/detail/:id': {
                name: 'detail',
                component(resolve) {
                    require(['../features/goods/detail.vue'], resolve);
                }
            },
            '/attr/:id': {
                name: 'good-attr',
                component(resolve) {
                    require(['../features/goods/goodAttr.vue'], resolve);
                }
            }
        }
    },
    '/order': {
        component(resolve) {
            require(['../features/index.vue'], resolve);
        },
        subRoutes: {
            '/': {
                component(resolve) {
                    require(['../features/order/index.vue'], resolve);
                }
            },
            '/list': {
                component(resolve) {
                    require(['../features/order/list.vue'], resolve);
                }
            },
            '/create': {
                component(resolve) {
                    require(['../features/order/create.vue'], resolve);
                }
            }
        }
    }
});

export default router;
