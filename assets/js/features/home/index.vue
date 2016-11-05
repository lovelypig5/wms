<script>
import template from 'templates/home/index.html';
import AppHeader from '../../layout/appHeader.vue';
import DICT from '../../config/dict';

var Home = Vue.extend({
    template: template,
    name: 'home',
    components: {
        appHeader: AppHeader
    },
    data() {
        return {
            menu: DICT.goodsMenu,
            path: ['/analysis', '/list', '/out', '/in', '/outList', '/inList', '/create']
        }
    },
    methods: {
        change(index) {
            this.selectIdx = index;
        }
    }
})

export default Home;
</script>
