<script>
import template from 'templates/layout/appHeader.html';
import LeftMenu from './leftMenu.vue';
import actions from '../vuex/actions';

var AppHeader = Vue.extend({
    template: template,
    name: 'header',
    ready() {
        this.getUser();
    },
    components: {
        leftMenu: LeftMenu
    },
    vuex: {
        getters: {
            lang: state => state.lang,
            user: state => state.user
        },
        actions: {
            changeLocale: actions.changeLocale,
            login(store) {
                this.$route.router.go({
                    path: '/login'
                })
            },
            logout: actions.logout,
            getUser: actions.user
        }
    }
})
export default AppHeader;
</script>
