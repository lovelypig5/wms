<script>
import template from 'templates/app.html';
import store from './vuex/store';
import acitons from './vuex/actions';
import Common from './common/index.vue';
import AppHeader from './layout/appHeader.vue';
import LoginPopup from './common/login.vue';

$.ajaxSetup({
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    statusCode: {
        401: () => {
            acitons.modal(store, {
                show: true,
                type: 'default',
                options: {
                    backdrop: 'static'
                },
                component: LoginPopup
            });
        }
    }
})

var App = Vue.extend({
    template: template,
    store,
    components: {
        appHeader: AppHeader,
        common: Common
    }
})
export default App;
</script>
