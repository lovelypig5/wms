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
            <tr class="item" v-for="record in outList">
                <td><a href="javascript:void(0)" v-link="{name: 'detail', params: {id: record.goods_id} }">{{record.good.name}}</a></td>
                <td>{{record.attrs | join-attrs}}</td>
                <td v-if="!record.edit">
                    {{record.amount}}
                </td>
                <td v-if="record.edit">
                    <input type="text" v-model="record.amount">
                </td>
                <td v-if="!record.edit">{{record.price}}
                </td>
                <td v-if="record.edit">
                    <input type="text" v-model="record.price">
                </td>
                <td>{{record.date}}</td>
                <td><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit(record)" v-if="!record.edit"></i>
                    <i class="fa fa-floppy-o" aria-hidden="true" v-if="record.edit" @click="save(record)"></i>
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
    ready() {
        this.fetch(true);
    },
    methods: {
        change(page) {
            this.params.page = page;
            this.fetch();
        },
        edit(record) {
            Vue.set(record, 'edit', !record.edit);
        },
        save(record) {
            var self = this;
            record.type = 1;
            $.ajax({
                url: API.modifyInOut,
                type: 'post',
                data: JSON.stringify(record),
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
                Vue.set(record, 'edit', !record.edit);
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
