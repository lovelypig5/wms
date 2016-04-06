import Router from 'vue-router';
import API from '../config/api';

Vue.use(Router);

var router = new Router({
    history: true
});
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
        },
        subRoutes: {
            '/': {
                component(resolve) {
                    require(['../features/goods/analysis.vue'], resolve);
                }
            },
            '/analysis': {
                component(resolve) {
                    require(['../features/goods/analysis.vue'], resolve);
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
    }
});

export default router;