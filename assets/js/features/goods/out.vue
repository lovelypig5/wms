<template>
    <div class="panel panel-primary good-in">
        <div class="panel-heading">商品出库</div>
        <div class="panel-body" v-show="!loading.fetch">
            <validator name="v">
                <div class="input-group">
                    <span class="input-group-addon">商品名称</span>
                    <div class="select2Div">
                        <select id="productName" style="width: 100%" v-model="model.id" v-validate:name="{required:true}">
                        </select>
                    </div>
                </div>
                <div class="input-group error-msg" v-if="$v.name.touched && $v.name.invalid">
                    <div v-if="$v.name.required" class="red-color">商品名称不能为空</div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">商品属性</span>
                    <div class="select2Div">
                        <select id="productAttr" style="width: 100%" v-model="model.attr">
                            <option v-for="attr in attrList" :value="attr.attr">{{attr.attr | remove-whitespace}}</option>
                        </select>
                    </div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">出库数量</span>
                    <input id="productAmount" type="text" class="form-control" placeholder="请输入出库数量" aria-describedby="productAmount" v-model="model.amount" v-validate:amount="{required:true, posInt: true}" :class="{'red-border': $v.amount && $v.amount.touched && $v.amount.invalid}" number>
                </div>
                <div class="input-group error-msg" v-if="$v.amount.touched && $v.amount.invalid">
                    <div v-if="$v.amount.required" class="red-color">出库数量不能为空</div>
                    <div v-if="!$v.amount.required && $v.amount.posInt" class="red-color">出库数量只能为正整数</div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon" id="productAmount">出售总价</span>
                    <input type="text" class="form-control" placeholder="请输入商品总价" aria-describedby="productPriceIn" v-model="model.priceOut" v-validate:price="{required:true, number: true}" :class="{'red-border': $v.price && $v.price.touched && $v.price.invalid}">
                </div>
                <div class="input-group error-msg" v-if="$v.price.touched && $v.price.invalid">
                    <div v-if="$v.price.required" class="red-color">出售总价不能为空</div>
                    <div v-if="!$v.price.required && $v.price.number" class="red-color">出售总价只能为数字</div>
                </div>
                <div class="float-right btns">
                    <button type="button" class="btn btn-primary" @click="goodsOut">出库</button>
                    <button type="button" class="btn btn-danger" @click="reset">取消</button>
                </div>
            </validator>
        </div>
        <div class="empty" v-show="loading.fetch">
            <div class="msg">正在加载商品详情</div>
        </div>
    </div>
</template>
<script>
import API from '../../config/api';
import DICT from '../../config/dict';
import actions from '../../vuex/actions';
import 'select2';

var Out = Vue.extend({
    name: 'out',
    data() {
        return {
            model: {
                id: "",
                name: "",
                attr: "",
                amount: 0,
                priceOut: ""
            },
            attrList: [],
            loading: {
                fetch: false,
                fetchList: false,
                out: false
            }
        }
    },
    ready() {
        var self = this;
        $(this.$el).find('#productName').select2({
            placeholder: "请输入商品名称（必填）",
            language: DICT.select2[this.lang],
            minimumInputLength: 1,
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
                self.model.id = data.id;
                self.model.name = data.text;
                self.fetchCombination();
            }
        })
        $(this.$el).find('#productAttr').select2({
            placeholder: "请选择商品属性",
            language: DICT.select2[this.lang],
            minimumResultsForSearch: Infinity
        })

        this.$watch('model.id', this.changeSelect);
        this.init();
    },
    watch: {
        attrList() {
            $(this.$el).find('#productAttr').trigger('change');
        }
    },
    methods: {
        fetchCombination() {
            var self = this;
            $.ajax({
                url: API.attrCombination,
                data: {
                    good_id: this.model.id
                },
                success(rows) {
                    self.attrList = rows;
                },
                error() {
                    self.attrList = [];
                }
            })
        },
        init() {
            var id = this.$route.query.id;
            var name = this.$route.query.name;

            if (id && name) {
                this.model.id = id;
                this.model.name = decodeURIComponent(name);
                $(this.$el).find('#productName').append('<option value="' + this.model.id + '">' + this.model.name + '</option>');
                this.fetchCombination();
            }
            var attr = this.$route.query.attr;
            if (attr) {
                this.model.attr = decodeURIComponent(attr);
            }
        },
        changeSelect() {
            $(this.$el).find('#productName').trigger('change');
        },
        goodsOut() {
            var self = this;
            self.$validate(true);
            if (self.$v.invalid) {
                return;
            }
            if (self.loading.out) {
                return;
            }
            self.loading.out = !self.loading.out;
            self.model.attr = $(self.$el).find('#productAttr').val();
            $.ajax({
                url: API.goodsOut,
                type: 'post',
                data: JSON.stringify(self.model),
                success(resp) {
                    self.alert({
                        show: true,
                        msg: '出库成功',
                        type: 'success'
                    });
                    self.reset(true);
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp.responseText || '出库失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.out = !self.loading.out;
            })
        },
        reset(flag) {
            var id = flag ? this.model.id: "";
            var name = flag ? this.model.name : "";
            this.model = {
                id: id,
                name: name,
                attr: "",
                amount: 0,
                priceOut: ""
            };
            this.attrList = [];
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
export default Out;
</script>