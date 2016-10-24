<template>
<router-view transition="fade" transition-mode="out-in" v-if="user.id">
</router-view>
</template>
<script>
import DICT from '../../config/dict';
import actions from '../../vuex/actions';

var Goods = Vue.extend({
    name: 'goods',
    ready() {
        this.isLogin();
    },
    methods: {
        change(index) {
            this.selectIdx = index;
        }
    },
    vuex: {
        getters: {
            user: state => state.user
        },
        actions: {
            isLogin: actions.isLogin
        }
    }
})

export default Goods;
</script>
