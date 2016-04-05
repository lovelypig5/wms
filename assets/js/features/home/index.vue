<template>
    <div class="container">
        欢迎使用本系统
    </div>
</template>
<script>
import DICT from '../../config/dict';

var Home = Vue.extend({
    name: 'goods',
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