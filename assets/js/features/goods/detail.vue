<script>
import template from 'templates/goods/detail.html';
import API from '../../config/api';
import actions from '../../vuex/actions';

var GoodDetail = Vue.extend({
    template: template,
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
