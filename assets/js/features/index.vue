<script>
import template from 'templates/index.html';
import AppHeader from '../layout/appHeader.vue';
import AppFooter from '../layout/appFooter.vue';

var Wrapper = Vue.extend({
    template: template,
    name: 'wrapper',
    components: {
        appHeader: AppHeader,
        appFooter: AppFooter
    }
})

export default Wrapper;
</script>
