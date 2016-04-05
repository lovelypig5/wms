<template>
    <div class="panel panel-primary good-list">
        <div class="panel-heading">出库记录</div>
        <table class="table" v-if="!loading.fetch && outList.length > 0">
            <thead>
                <tr>
                    <th>商品名称</th>
                    <th>商品属性</th>
                    <th>出库数量</th>
                    <th>出库价格</th>
                    <th>出库时间</th>
                </tr>
            </thead>
            <tbody>
                <tr class="item" v-for="good in outList">
                    <td><a href="javascript:void(0)" v-link="{path: '/goods/detail/'+good.goods_id}">{{good.name}}</a></td>
                    <td>{{good.goods_attr | remove-whitespace}}</td>
                    <td>{{good.amount}}</td>
                    <td>{{good.price}}</td>
                    <td>{{good.date}}</td>
                </tr>
            </tbody>
        </table>
        <div class="empty" v-if="!loading.fetch && outList.length == 0">
            <div class="msg">没有出库记录</div>
        </div>
        <div v-if="loading.fetch">
            <div class="loading audio-wave"></div>
        </div>
    </div>
</template>
<script>
import API from '../../config/api';
import actions from '../../vuex/actions';

var OutList = Vue.extend({
    name: 'outList',
    data() {
        return {
            outList: [],
            loading: {
                fetch: false
            },
            params: {
                page: 1,
                pageSize: 10,
                count: 0,
                type: 1
            }
        }
    },
    ready() {
        this.fetch(true);
    },
    methods: {
        fetch(reset) {
            var self = this;

            if (reset) {
                self.params = {
                    page: 1,
                    pageSize: 10,
                    count: 0,
                    type: 1
                }
            } else {
                self.params.page += 1;
            }

            if (self.loading.fetch) {
                return;
            }
            self.loading.fetch = !self.loading.fetch;

            $.ajax({
                url: API.outList,
                data: self.params,
                success(resp) {
                    self.outList = resp.content;
                    self.params.total = resp.total;
                    self.params.totalPage = resp.total / self.params.pageSize;
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: '拉取出库记录失败',
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
export default OutList;
</script>