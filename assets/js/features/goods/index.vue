<template>
<div class="container" v-if="user.id">
    <div class="col-sm-3">
        <div class="list-group">
            <router-link to="{path: '/goods' + path[index], activeClass:'active'}" class="list-group-item" v-for="item in menu">{{ $t(item) }}</router-link>
        </div>
    </div>
    <div class="col-sm-9 content">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</div>
</template>
<script>
import DICT from '../../config/dict';
import actions from '../../vuex/actions';

var Goods = Vue.extend({
    name: 'goods',
    data() {
        return {
            menu: DICT.goodsMenu,
            path: ['/analysis', '/list', '/out', '/in', '/outList', '/inList', '/create']
        }
    },
    mounted() {
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
