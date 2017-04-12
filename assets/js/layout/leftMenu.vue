<script>
import template from 'templates/layout/leftMenu.html';
import DICT from 'config/dict';

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
            children: DICT.goodsMenu.map((menu)=>{
                return {
                   name: Vue.t(menu.i18nkey),
                   path: menu.path,
                   className: '',
                   children: []
               }
            })
        }, {
            name: Vue.t("order"),
            path: '/order/list',
            className: 'fa-table',
            children: DICT.orderMenu.map((menu)=>{
                return {
                   name: Vue.t(menu.i18nkey),
                   path: menu.path,
                   className: '',
                   children: []
               }
            })
        }]

        return {
            navs: navs
        };
    }
});

export default LeftMenu;
</script>
