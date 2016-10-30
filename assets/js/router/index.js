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
    '/': {
        component(resolve) {
            require(['../features/home/index.vue'], resolve);
        }
    },
    'home': {
        component(resolve) {
            require(['../features/home/index.vue'], resolve);
        }
    },
    'goods': {
        component(resolve) {
            require(['../features/goods/index.vue'], resolve);
        }
    },
    'goods/list': {
        component(resolve) {
            require(['../features/goods/goodList.vue'], resolve);
        }
    },
    'goods/create': {
        component(resolve) {
            require(['../features/goods/create.vue'], resolve);
        }
    },
    'goods/in': {
        component(resolve) {
            require(['../features/goods/in.vue'], resolve);
        }
    },
    'goods/out': {
        component(resolve) {
            require(['../features/goods/out.vue'], resolve);
        }
    },
    'goods/inList': {
        component(resolve) {
            require(['../features/goods/inList.vue'], resolve);
        }
    },
    'goods/outList': {
        component(resolve) {
            require(['../features/goods/outList.vue'], resolve);
        }
    },
    'goods/detail/:id': {
        name: 'detail',
        component(resolve) {
            require(['../features/goods/detail.vue'], resolve);
        }
    },
    'goods/attr/:id': {
        name: 'good-attr',
        component(resolve) {
            require(['../features/goods/goodAttr.vue'], resolve);
        }
    },
    'order': {
        component(resolve) {
            require(['../features/order/index.vue'], resolve);
        }
    },
    'order/list': {
        component(resolve) {
            require(['../features/order/list.vue'], resolve);
        }
    },
    'order/create': {
        component(resolve) {
            require(['../features/order/create.vue'], resolve);
        }
    }
});

export default router;
