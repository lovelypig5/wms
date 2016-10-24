<script>
import template from 'templates/layout/appHeader.html';
import LoginPopup from '../common/login.vue';
import actions from '../vuex/actions';

var AppHeader = Vue.extend({
    template: template,
    ready() {
        this.getUser();
    },
    data() {
        var navs = [{
            name: Vue.t("home"),
            path: '/home',
            className: 'fa-dashboard',
            children: []
        }, {
            name: Vue.t("goods"),
            path: '/goods/list',
            className: 'fa-bar-chart-o',
            children: [{
                name: Vue.t("text_goods_state"),
                path: '/goods/analysis',
                className: '',
                children: []
            }, {
                name: Vue.t("text_goods_list"),
                path: '/goods/list',
                className: '',
                children: []
            }, {
                name: Vue.t("text_goods_out"),
                path: '/goods/out',
                className: '',
                children: []
            }, {
                name: Vue.t("text_goods_in"),
                path: '/goods/in',
                className: '',
                children: []
            }, {
                name: Vue.t("text_goods_outlist"),
                path: '/goods/outList',
                className: '',
                children: []
            }, {
                name: Vue.t("text_goods_inlist"),
                path: '/goods/inList',
                className: '',
                children: []
            }, {
                name: Vue.t("text_goods_create"),
                path: '/goods/create',
                className: '',
                children: []
            }]
        }, {
            name: Vue.t("order"),
            path: '/order/list',
            className: 'fa-table',
            children: [{
                name: Vue.t("text_order_list"),
                path: '/order/list',
                className: '',
                children: []
            }, {
                name: Vue.t("text_order_create"),
                path: '/order/create',
                className: '',
                children: []
            }]
        }]

        return {
            navs: navs
        };
    },
    vuex: {
        getters: {
            lang: state => state.lang,
            user: state => state.user
        },
        actions: {
            changeLocale: actions.changeLocale,
            login(store) {
                actions.modal(store, {
                    show: true,
                    type: 'default',
                    options: {
                        backdrop: 'static'
                    },
                    component: LoginPopup
                })
            },
            logout: actions.logout,
            getUser: actions.user
        }
    }
})
export default AppHeader;
</script>
