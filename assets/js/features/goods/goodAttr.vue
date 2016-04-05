<template>
    <div class="panel panel-primary good-attr">
        <div class="panel-heading">{{good.name}}</div>
        <table class="table" v-if="!loading.fetch">
            <thead>
                <tr>
                    <th>属性列表</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr class="item" v-for="g in good.list">
                    <td>{{g.attr}}</td>
                    <td>
                        <a href="javascript:void(0)" v-link="{path: 'goods/analysis'}">趋势</a>
                    </td>
                </tr>
                <tr class="item" v-if="good.list.length==0">
                    <td colspan="2">还没有属性，赶紧创建吧</td>
                </tr>
            </tbody>
        </table>
        <div v-if="loading.fetch">
            <div class="loading audio-wave"></div>
        </div>
    </div>
</template>
<script>
import API from '../../config/api';
import actions from '../../vuex/actions';

var GoodAttr = Vue.extend({
    name: 'goodAttr',
    data() {
        return {
            good: {
                name: "",
                list: []
            },
            loading: {
                fetch: false
            }
        }
    },
    ready() {
        this.fetch(true);
    },
    methods: {
        fetch(reset) {
            var self = this;

            if (self.loading.fetch) {
                return;
            }
            self.loading.fetch = !self.loading.fetch;

            $.ajax({
                url: API.goodsDetail,
                data: {
                    id: this.$route.params.id
                },
                success(resp) {
                    self.good = resp;
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: '获取商品详情失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.fetch = !self.loading.fetch;
            })
        }
    },
    vuex: {
        actions: {
            alert: actions.alert
        }
    }
})
export default GoodAttr;
</script>