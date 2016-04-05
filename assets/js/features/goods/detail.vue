<template>
    <div class="panel panel-primary good-list">
        <div class="panel-heading">{{good.name}}<a href="" v-link="{name: '/good-attr', params: params}">编辑商品属性</a></div>
        <table class="table" v-if="!loading.fetch">
            <thead>
                <tr>
                    <th>属性</th>
                    <th>库存数量</th>
                    <th>操作</th>
                    <th>趋势</th>
                </tr>
            </thead>
            <tbody>
                <tr class="item">
                    <td>所有</td>
                    <td>{{good.total}}</td>
                    <td>
                    </td>
                    <td>
                        <a href="javascript:void(0)" v-link="{path: '/goods/analysis'}">趋势</a>
                    </td>
                </tr>
                <tr class="item" v-for="g in good.list">
                    <td>{{g.attr | remove-whitespace}}</td>
                    <td>{{g.count}}</td>
                    <td>
                        <a href="javascript:void(0)" v-link="{path: '/goods/in', query: {id: good.id, name: good.name, attr: g.attr} }">入库</a>
                        <a href="javascript:void(0)" v-link="{path: '/goods/out', query: {id: good.id, name: good.name, attr: g.attr} }">出库</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" v-link="{path: '/goods/analysis'}">趋势</a>
                    </td>
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

var GoodDetail = Vue.extend({
    name: 'goodList',
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
export default GoodDetail;
</script>