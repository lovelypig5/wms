<script>
import template from 'templates/goods/in.html';
import API from '../../config/api';
import DICT from '../../config/dict';
import actions from '../../vuex/actions';
import 'select2';

var GoodIn = Vue.extend({
    template: template,
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

        this.$watch('model.id', this.changeSelect);
        this.init();
    },
    watch: {
        attrList() {
            $(this.$el).find('#productAttr').trigger('change');
        }
    },
    methods: {
        init() {
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
