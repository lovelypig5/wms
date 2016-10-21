<template>
    <div class="container" v-if="user.id">
        <div class="col-sm-3">
            <div class="list-group">
                <a href="javascript:void(0)" v-link="{path: '/goods' + path[$index], activeClass:'active'}" class="list-group-item" v-for="item in menu">{{ $t(item) }} </a>
            </div>
        </div>
        <div class="col-sm-9 content">
            <router-view transition="fade" transition-mode="out-in"></router-view>
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