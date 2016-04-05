<template>
    <div class="panel panel-primary good-list">
        <div class="panel-heading">商品列表</div>
        <table class="table" v-if="!loading.fetch && goodList.length > 0">
            <thead>
                <tr>
                    <th>商品名称</th>
                    <th>库存数量</th>
                    <th>操作</th>
                    <th>库存趋势</th>
                </tr>
            </thead>
            <tbody>
                <tr class="item" v-for="good in goodList">
                    <td>
                        <a href="javascript:void(0)" v-link="{name: 'detail', params: {id: good.id} }">{{good.name}}</a>
                    </td>
                    <td>{{good.count}}</td>
                    <td>
                        <a href="javascript:void(0)" v-link="{path: '/goods/in', query: {id: good.id, name: good.name} }">入库</a>
                        <a href="javascript:void(0)" v-link="{path: '/goods/out', query: {id: good.id, name: good.name} }">出库</a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" v-link="{path: '/goods/analysis', params: {id: good.id}}">趋势</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="empty" v-if="!loading.fetch && goodList.length == 0">
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

var GoodList = Vue.extend({
    name: 'goodList',
    data() {
        return {
            goodList: [],
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
        fetch(reset) {
            var self = this;

            if (reset) {
                self.params = {
                    page: 1,
                    pageSize: 10,
                    count: 0
                }
            } else {
                self.params.page += 1;
            }

            if (self.loading.fetch) {
                return;
            }
            self.loading.fetch = !self.loading.fetch;

            $.ajax({
                url: API.goodList,
                data: self.params,
                success(resp) {
                    self.goodList = resp.content;
                    self.params.total = resp.total;
                    self.params.totalPage = resp.total / self.params.pageSize;
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
export default GoodList;
</script>