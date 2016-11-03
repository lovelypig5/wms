<script>
import template from 'templates/index.html';
import AppFooter from '../layout/appFooter.vue';

var Wrapper = Vue.extend({
    template: template,
    name: 'wrapper',
    components: {
        appFooter: AppFooter
    }
})

export default Wrapper;
</script>
