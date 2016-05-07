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
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr class="item" v-for="order in orderList">
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
                    <td><a href="javascript:void(0)">展开</a></td>
                </tr>
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
                fetch: false
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
                        msg: '拉取商品列表失败',
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
export default OrderList;
</script>
