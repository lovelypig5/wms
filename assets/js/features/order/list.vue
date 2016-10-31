<template>
<div class="panel panel-primary good-list">
    <div class="panel-heading">订单列表</div>
    <table class="table" v-if="!loading.fetch && orderList.length > 0">
        <thead>
            <tr>
                <th>订单号</th>
                <th>快递单号</th>
                <th>快递费用</th>
                <th>收件人</th>
                <th>价格</th>
                <th>操作</th>
                <th>发货时间</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="order in orderList">
                    <tr class="item" >
                        <td>
                            {{order.id}}
                        </td>
                        <td>{{order.expressId}}</td>
                        <td>
                            {{order.expressCost}}
                        </td>
                        <td>
                            {{order.name}}
                        </td>
                        <td>
                            {{order.price}}
                        </td>
                        <td><a href="javascript:void(0)" @click="expand(order)" v-if="!order.goodList">展开</a>
                            <div v-if="order.goodList && order.goodList.length > 0" v-for="good in order.goodList">
                                <span>{{ good.name }}</span>
                                <span>({{ good.attrs | join-attrs }})</span>
                                <span>*{{ good.amount }}</span>
                            </div>
                        </td>
                        <td>
                            {{order.date}}
                        </td>
                    </tr>
                    <tr v-if="order.comment">
                        <td colspan="7">{{order.comment}}</td>
                    </tr>
</template>
            </tbody>
        </table>
        <pagination :pagination="params" :change="change"></pagination>
        <div class="empty" v-if="!loading.fetch && orderList.length == 0">
            <div class="msg">商品列表为空</div>
        </div>
        <div v-if="loading.fetch">
            <div class="loading audio-wave"></div>
        </div>
    </div>
</template>
<script>
import API from '../../config/api';
import actions from '../../vuex/actions';
import Pagination from '../../common/pagination.vue';

var OrderList = Vue.extend({
    name: 'orderList',
    components: {
        pagination: Pagination
    },
    data() {
        return {
            orderList: [],
            loading: {
                fetch: false,
                fetchGood: false
            },
            params: {
                page: 1,
                pageSize: 10,
                count: 0
            }
        }
    },
    ready() {
        this.fetch(true);
    },
    methods: {
        change(page) {
            this.params.page = page;
            this.fetch();
        },
        fetch(reset) {
            var self = this;

            if (reset) {
                self.params = {
                    page: 1,
                    pageSize: 10,
                    count: 0
                }
            }

            if (self.loading.fetch) {
                return;
            }
            self.loading.fetch = !self.loading.fetch;

            $.ajax({
                url: API.orderList,
                data: self.params,
                success(resp) {
                    self.orderList = resp.content;
                    self.params.count = Math.ceil(resp.count / self.params.pageSize);
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: '拉取订单列表失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.fetch = !self.loading.fetch;
            })
        },
        expand(order) {
            var self = this;
            if (self.loading.fetchGood) {
                return;
            }
            self.loading.fetchGood = !self.loading.fetchGood;

            $.ajax({
                url: API.orderDetail,
                data: {
                    order_id: order.id
                },
                success(resp) {
                    Vue.set(order, 'goodList', resp);
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: '获取订单商品失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.fetchGood = !self.loading.fetchGood;
            })
        }
    },
    vuex: {
        actions: {
            alert: actions.alert
        }
    }
})
export default OrderList;
</script>
