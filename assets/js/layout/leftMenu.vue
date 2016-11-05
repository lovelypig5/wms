<script>
import template from 'templates/layout/leftMenu.html';

var LeftMenu = Vue.extend({
    template: template,
    name: 'leftmenu',
    data() {
        var navs = [{
            name: Vue.t("home"),
            path: '/home',
            className: 'fa-dashboard',
            children: []
        }, {
            name: Vue.t("goods"),
            path: '/goods',
            className: 'fa-bar-chart-o',
            children: [{
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
    }
});

export default LeftMenu;
</script>
