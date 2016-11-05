<script>
import template from 'templates/app.html';
import store from './vuex/store';
import Common from './common/index.vue';
import router from './router';

$.ajaxSetup({
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    statusCode: {
        401: () => {
            router.go({
                path: '/login'
            })
        }
    }
})

var App = Vue.extend({
    template: template,
    store,
    components: {
        common: Common
    }
})
export default App;
</script>
