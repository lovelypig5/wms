<template>
    <div class="panel panel-primary good-detail">
        <div class="panel-heading">{{good.name}}</div>
        <div class="attList">
            <table class="table">
                <thead>
                    <tr>
                        <th>属性列表<span class="add-attr" data-container=".good-detail" data-toggle="popover" data-placement="bottom">+</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span v-for="attr in attrlist" class="attr">{{attr.attr}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table class="table" v-if="!loading.fetch">
            <thead>
                <tr>
                    <th>库存列表</th>
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
</template>
<script>
import API from '../../config/api';
import actions from '../../vuex/actions';

var GoodDetail = Vue.extend({
    name: 'goodList',
    data() {
        return {
            attrlist: [],
            good: {
                name: "",
                list: []
            },
            loading: {
                fetch: false,
                add: false
            }
        }
    },
    ready() {
        this.fetch(true);
        this.fetchAttrList();

        $(this.$el).on('click', '.save', this.addAttr);
        $('.add-attr').popover({
            content() {
                return '<input type="text" placeholder="请输入属性名称" class="attrName"/><button class="btn-primary save">保存</button>'
            },
            html: true
        });
    },
    methods: {
        addAttr() {
            var self = this;
            var attr = $(this.$el).find('.attrName').val();
            if (!attr || !attr.trim()) {
                return
            }

            if (self.loading.add) {
                return
            }

            self.loading.add = !self.loading.add;
            $.ajax({
                url: API.addAttr,
                type: 'post',
                data: JSON.stringify({
                    attr: attr,
                    goods_id: this.good.id
                }),
                success(resp) {
                    self.alert({
                        show: true,
                        msg: '添加成功',
                        type: 'success'
                    })
                    self.attrlist.push({
                        attr: attr
                    });
                    $(self.$el).find('.attrName').val('');
                    $('.add-attr').popover('hide');
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp.responseText || '添加商品属性失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.add = !self.loading.add;
            })
        },
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
        },
        fetchAttrList(callback) {
            var self = this;
            $.ajax({
                url: API.goodsAttrs,
                data: {
                    good_id: this.$route.params.id
                },
                success(rows) {
                    self.attrlist = rows;

                    if (callback && typeof callback == 'function') {
                        callback();
                    }
                },
                error() {
                    self.attrlist = [];
                }
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