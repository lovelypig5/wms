<template>
    <div class="panel panel-primary create-order">
        <div class="panel-heading">创建订单</div>
        <div class="panel-body">
            <validator name="v">
                <div class="input-group">
                    <span class="input-group-addon">订单号：</span>
                    <input id="orderId" type="text" class="form-control" placeholder="请输入订单号" aria-describedby="orderId" v-model="model.orderId" v-validate:order-id="{required:true, posInt: true}" :class="{'red-border': $v.orderId && $v.orderId.touched && $v.orderId.invalid}" number>
                </div>
                <div class="input-group error-msg" v-if="$v.orderId.touched && $v.orderId.invalid">
                    <div v-if="$v.orderId.required" class="red-color">订单号不能为空</div>
                    <div v-if="!$v.orderId.required && $v.orderId.posInt" class="red-color">订单号只能为正整数</div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">收货人：</span>
                    <input id="receiveName" type="text" class="form-control" placeholder="请输入收货人" aria-describedby="receiveName" v-model="model.receiveName" v-validate:receive-name="{required:true}" :class="{'red-border': $v.receiveName && $v.receiveName.touched && $v.receiveName.invalid}">
                </div>
                <div class="input-group error-msg" v-if="$v.receiveName.touched && $v.receiveName.invalid">
                    <div v-if="$v.receiveName.required" class="red-color">收货人不能为空</div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">订单价格</span>
                    <input id="price" type="text" class="form-control" placeholder="请输入订单价格" aria-describedby="price" v-model="model.price" v-validate:price="{required:true}" :class="{'red-border': $v.price && $v.price.touched && $v.price.invalid}" number>
                </div>
                <div class="input-group error-msg" v-if="$v.price.touched && $v.price.invalid">
                    <div v-if="$v.price.required" class="red-color">订单号不能为空</div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">快递单号</span>
                    <input id="expressId" type="text" class="form-control" placeholder="请输入快递单号" aria-describedby="expressId" v-model="model.expressId" v-validate:express-id="{required:true, posInt: true}" :class="{'red-border': $v.expressId && $v.expressId.touched && $v.expressId.invalid}" number>
                </div>
                <div class="input-group error-msg" v-if="$v.expressId.touched && $v.expressId.invalid">
                    <div v-if="$v.expressId.required" class="red-color">快递单号不能为空</div>
                    <div v-if="!$v.expressId.required && $v.expressId.posInt" class="red-color">快递单号只能为正整数</div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">快递费：</span>
                    <input id="expressCost" type="text" class="form-control" placeholder="请输入快递费" aria-describedby="expressCost" v-model="model.expressCost" v-validate:express-cost="{required:true, posInt: true}" :class="{'red-border': $v.expressCost && $v.expressCost.touched && $v.expressCost.invalid}" number>
                </div>
                <div class="input-group error-msg" v-if="$v.expressCost.touched && $v.expressCost.invalid">
                    <div v-if="$v.expressCost.required" class="red-color">快递费不能为空</div>
                    <div v-if="!$v.expressCost.required && $v.expressCost.posInt" class="red-color">快递费只能为正整数</div>
                </div>
                <div class="good-list" v-if="model.goodList.length > 0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>商品名称</th>
                                <th>商品属性</th>
                                <th>商品数量</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="item" v-for="good in model.goodList">
                                <td>{{good.name}}</td>
                                <td>{{good.attr.join(',') | remove-whitespace}}</td>
                                <td>
                                    {{good.amount}}
                                </td>
                                <td><i class="fa fa-trash" aria-hidden="true" @click="remove($index)"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="right" v-show="!add"><a href="javascript:void(0)" @click="add=!add">+添加商品</a></div>
                <div v-show="add" class="addArea">
                    <div class="input-group">
                        <span class="input-group-addon">商品名称</span>
                        <div class="select2Div">
                            <select id="productName" style="width: 100%" v-model="good.id">
                            </select>
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">商品属性</span>
                        <div class="select2Div">
                            <select id="productAttr" style="width: 100%">
                                <option v-for="attr in attrList" :value="attr.attr">{{attr.attr}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">商品数量</span>
                        <input id="productAmount" type="text" class="form-control" placeholder="请输入商品数量" aria-describedby="productAmount" v-model="good.amount" number>
                    </div>
                    <div class="float-right btns">
                        <button type="button" class="btn btn-primary" @click="addGood">保存</button>
                        <button type="button" class="btn btn-danger" @click="add = !add">完成</button>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </validator>
            <div class="float-right btns">
                <button type="button" class="btn btn-primary" @click="createOrder">创建</button>
                <button type="button" class="btn btn-danger" @click="reset">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import API from '../../config/api';
import DICT from '../../config/dict';
import actions from '../../vuex/actions';
import 'select2';

var CreateOrder = Vue.extend({
    name: 'createOrder',
    data() {
        return {
            model: {
                orderId: "",
                receiveName: "",
                expressId: "",
                expressCost: "",
                goodList: [],
                price: ""
            },
            good: {
                id: "",
                name: "",
                attr: "",
                amount: 0,
            },
            attrList: [],
            loading: {
                create: false
            },
            add: false
        }
    },
    ready() {
        var self = this;
        $(this.$el).find('#productName').select2({
            placeholder: "请输入商品名称（必填）",
            language: DICT.select2[this.lang],
            ajax: {
                url: API.searchGood,
                data(params) {
                    return {
                        name: params.term,
                        page: params.page
                    };
                },
                dataType: 'json',
                delay: 700,
                processResults: function(resp, params) {
                    var ret = [];
                    resp.forEach((r) => {
                        ret.push({
                            id: r.id,
                            text: r.name
                        })
                    })

                    return {
                        results: ret
                    };
                }
            }
        }).on('select2:select', (event) => {
            var data = event.params.data;
            if (data) {
                self.good.id = data.id;
                self.good.name = data.text;
                self.fetchAttrs();
            }
        })
        $(this.$el).find('#productAttr').select2({
            multiple: true,
            placeholder: "请选择商品属性",
            language: DICT.select2[this.lang]
        })
        this.$watch('good.id', this.changeSelect);
    },
    watch: {
        attrList() {
            $(this.$el).find('#productAttr').trigger('change');
        }
    },
    methods: {
        remove(index){
            this.model.goodList.splice(index, 1);
        },
        changeSelect() {
            $(this.$el).find('#productName').trigger('change');
        },
        addGood() {
            this.good.attr = $(this.$el).find('#productAttr').val();
            var good = Object.assign({}, this.good);
            this.reset();
            this.model.goodList.push(good);
        },
        fetchAttrs(callback) {
            var self = this;
            $.ajax({
                url: API.goodsAttrs,
                data: {
                    good_id: this.good.id
                },
                success(rows) {
                    self.attrList = rows;

                    if (callback && typeof callback == 'function') {
                        callback();
                    }
                },
                error() {
                    self.attrList = [];
                }
            })
        },
        reset(flag) {
            var id = flag ? this.good.id : "";
            var name = flag ? this.good.name : "";
            this.good = {
                id: id,
                name: name,
                attr: [],
                amount: 0,
            };
            this.attrList = [];
            this.$resetValidation();
        },
        createOrder() {
            var self = this;
            self.$validate(true);
            if (self.$v.invalid) {
                return;
            }
            if (self.loading.create) {
                return;
            }
            self.loading.create = !self.loading.create;
            $.ajax({
                url: API.createOrder,
                type: 'post',
                data: JSON.stringify(self.model),
                success(resp) {
                    self.alert({
                        show: true,
                        msg: '添加成功',
                        type: 'success'
                    });
                    self.resetOrder();
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp.responseText || '添加订单失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.create = !self.loading.create;
            })
        },
        resetOrder() {
            this.model = {
                orderId: "",
                receiveName: "",
                expressId: "",
                expressCost: "",
                goodList: [],
                price: ""
            }
            this.$resetValidation();
        }
    },
    vuex: {
        getters: {
            lang: state => state.lang
        },
        actions: {
            alert: actions.alert
        }
    }
})
export default CreateOrder;
</script>
