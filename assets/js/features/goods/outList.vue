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
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr class="item" v-for="good in outList">
                <td>
                    <router-link to="{name: 'detail', params: {id: good.goods_id} }">{{good.name}}</router-link>
                </td>
                <td>{{good.goods_attr | remove-whitespace}}</td>
                <td v-if="!good.edit">
                    {{good.amount}}
                </td>
                <td v-if="good.edit">
                    <input type="text" v-model="good.amount">
                </td>
                <td v-if="!good.edit">{{good.price}}
                </td>
                <td v-if="good.edit">
                    <input type="text" v-model="good.price">
                </td>
                <td>{{good.date}}</td>
                <td><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit(good)" v-if="!good.edit"></i>
                    <i class="fa fa-floppy-o" aria-hidden="true" v-if="good.edit" @click="save(good)"></i>
                </td>
            </tr>
        </tbody>
    </table>
    <pagination :pagination="params" :change="change"></pagination>
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
import Pagination from '../../common/pagination.vue';

var OutList = Vue.extend({
    name: 'outList',
    components: {
        pagination: Pagination
    },
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
    mounted() {
        this.fetch(true);
    },
    methods: {
        change(page) {
            this.params.page = page;
            this.fetch();
        },
        edit(good) {
            Vue.set(good, 'edit', !good.edit);
        },
        save(good) {
            var self = this;
            good.type = 1;
            $.ajax({
                url: API.modifyInOut,
                type: 'post',
                data: JSON.stringify(good),
                success(resp) {

                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp || '修改出库记录失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                Vue.set(good, 'edit', !good.edit);
            })
        },
        fetch(reset) {
            var self = this;

            if (reset) {
                self.params = {
                    page: 1,
                    pageSize: 10,
                    count: 0,
                    type: 1
                }
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
                    self.params.count = Math.ceil(resp.count / self.params.pageSize);
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
