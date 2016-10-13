<template>
<div class="panel panel-primary good-in">
    <div class="panel-heading">商品入库</div>
    <div class="panel-body">
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
                    <select id="productAttr" style="width: 100%">
                            <option v-for="attr in attrList" :value="attr.attr">{{attr.attr}}</option>
                        </select>
                </div>
            </div>
            <div class="input-group">
                <span class="input-group-addon">入库数量</span>
                <input id="productAmount" type="text" class="form-control" placeholder="请输入入库数量" aria-describedby="productAmount" v-model.number="model.amount"
                    v-validate:amount="{required:true, posInt: true}" :class="{'red-border': $v.amount && $v.amount.touched && $v.amount.invalid}">
            </div>
            <div class="input-group error-msg" v-if="$v.amount.touched && $v.amount.invalid">
                <div v-if="$v.amount.required" class="red-color">入库数量不能为空</div>
                <div v-if="!$v.amount.required && $v.amount.posInt" class="red-color">入库数量只能为正整数</div>
            </div>
            <div class="input-group">
                <span class="input-group-addon" id="productAmount">商品进价</span>
                <input type="text" class="form-control" placeholder="请输入商品进价" aria-describedby="productPriceIn" v-model.number="model.priceIn"
                    v-validate:price="{required:true, number: true}" :class="{'red-border': $v.price && $v.price.touched && $v.price.invalid}">
            </div>
            <div class="input-group error-msg" v-if="$v.price.touched && $v.price.invalid">
                <div v-if="$v.price.required" class="red-color">商品进价不能为空</div>
                <div v-if="!$v.price.required && $v.price.number" class="red-color">商品进价只能为数字</div>
            </div>
            <div class="float-right btns">
                <button type="button" class="btn btn-primary" @click="goodsIn">入库</button>
                <button type="button" class="btn btn-danger" @click="reset">取消</button>
            </div>
        </validator>
    </div>
</div>
</template>
<script>
import API from '../../config/api';
import DICT from '../../config/dict';
import actions from '../../vuex/actions';
import 'select2';

var GoodIn = Vue.extend({
    name: 'in',
    data() {
        return {
            model: {
                id: "",
                name: "",
                attr: [],
                amount: 0,
                priceIn: ""
            },
            attrList: [],
            loading: { in: false
            }
        }
    },
    mounted() {
        var self = this;
        Vue.nextTick(() => {
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
                    self.model.id = data.id;
                    self.model.name = data.text;
                    self.fetchAttrs();
                }
            })
            $(this.$el).find('#productAttr').select2({
                multiple: true,
                placeholder: "请选择商品属性",
                language: DICT.select2[this.lang]
            })

            this.initilize();
        })

        this.$watch('model.id', this.changeSelect);
    },
    watch: {
        attrList() {
            $(this.$el).find('#productAttr').trigger('change');
        }
    },
    methods: {
        initilize() {
            var self = this;
            var id = self.$route.query.id;
            var name = self.$route.query.name;

            if (id && name) {
                self.model.id = id;
                self.model.name = decodeURIComponent(name);
                $(self.$el).find('#productName').append('<option value="' + self.model.id + '">' + self.model.name +
                    '</option>');
                self.fetchAttrs(() => {
                    var attr = self.$route.query.attr;
                    attr = decodeURIComponent(attr).split(',');
                    if (attr) {
                        Vue.nextTick(() => {
                            self.model.attr = attr;
                            $("#productAttr").val(attr).trigger('change');
                        })
                    }
                });
            }
        },
        changeSelect() {
            $(this.$el).find('#productName').trigger('change');
        },
        fetchAttrs(callback) {
            var self = this;
            $.ajax({
                url: API.goodsAttrs,
                data: {
                    good_id: this.model.id
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
        goodsIn() {
            var self = this;
            self.$validate(true);
            if (self.$v.invalid) {
                return;
            }
            if (self.loading.in) {
                return;
            }
            self.loading.in = !self.loading.in;

            self.model.attr = $(self.$el).find('#productAttr').val();
            $.ajax({
                url: API.goodsIn,
                type: 'post',
                data: JSON.stringify(self.model),
                success(resp) {
                    self.alert({
                        show: true,
                        msg: '入库成功',
                        type: 'success'
                    });
                    self.reset(true);
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp.responseText || '入库失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.in = !self.loading.in;
            })
        },
        reset(flag) {
            var id = flag ? this.model.id : "";
            var name = flag ? this.model.name : "";
            this.model = {
                id: id,
                name: name,
                attr: [],
                amount: 0,
                priceIn: ""
            };
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
export default GoodIn;
</script>
