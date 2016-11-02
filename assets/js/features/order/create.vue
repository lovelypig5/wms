<script>
import template from 'templates/order/create.html';
import API from '../../config/api';
import DICT from '../../config/dict';
import actions from '../../vuex/actions';
import 'select2';

var CreateOrder = Vue.extend({
    template: template,
    name: 'createOrder',
    data() {
        return {
            model: {
                orderId: "",
                receiveName: "",
                expressId: "",
                expressCost: "",
                goodList: [],
                price: "",
                comment: ""
            },
            good: {
                id: "",
                name: "",
                attr: "",
                amount: "",
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
                self.fetchCombination();
            }
        })
        $(this.$el).find('#productAttr').select2({
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
        fetchCombination() {
            var self = this;
            $.ajax({
                url: API.attrCombination,
                data: {
                    good_id: this.good.id
                },
                success(rows) {
                    self.attrList = rows;
                },
                error() {
                    self.attrList = [];
                }
            })
        },
        remove(index) {
            this.model.goodList.splice(index, 1);
        },
        changeSelect() {
            $(this.$el).find('#productName').trigger('change');
        },
        addGood() {
            this.good.attr = $(this.$el).find('#productAttr').val() || [];
            var good = Object.assign({}, this.good);
            if (!this.good.id || !this.good.name) {
                this.alert({
                    show: true,
                    msg: '请输入商品名称',
                    type: 'success'
                });
                return;
            }
            if (!this.good.amount) {
                this.alert({
                    show: true,
                    msg: '请输入商品数量',
                    type: 'success'
                });
                return;
            }
            this.reset();
            this.model.goodList.push(good);
            this.add = !this.add;
        },
        // fetchAttrs(callback) {
        //     var self = this;
        //     $.ajax({
        //         url: API.goodsAttrs,
        //         data: {
        //             good_id: this.good.id
        //         },
        //         success(rows) {
        //             self.attrList = rows;

        //             if (callback && typeof callback == 'function') {
        //                 callback();
        //             }
        //         },
        //         error() {
        //             self.attrList = [];
        //         }
        //     })
        // },
        reset(flag) {
            var id = flag ? this.good.id : "";
            var name = flag ? this.good.name : "";
            this.good = {
                id: id,
                name: name,
                attr: [],
                amount: "",
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
                price: "",
                comment: ""
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
