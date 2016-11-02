<script>
import template from 'templates/goods/out.html';
import API from '../../config/api';
import DICT from '../../config/dict';
import actions from '../../vuex/actions';
import 'select2';

var Out = Vue.extend({
    template: template,
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
                $(this.$el).find('#productName').append('<option value="' + this.model.id + '">' + this.model.name +
                    '</option>');
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
            var id = flag ? this.model.id : "";
            var name = flag ? this.model.name : "";
            this.model = {
                id: id,
                name: name,
                attr: "",
                amount: 0,
                priceOut: ""
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
export default Out;
</script>
