<script>
import template from 'templates/goods/create.html';
import API from '../../config/api';
import Alert from '../../common/alert.vue';
import actions from '../../vuex/actions';
import Taggle from 'taggle';

var Create = Vue.extend({
    template: template,
    name: 'create',
    data() {
        return {
            model: {
                name: ""
            },
            loading: {
                create: false
            }
        }
    },
    ready() {
        this.taggle = new Taggle('productAttr', {
            placeholder: '请输入商品属性（选填）（Enter键确认）'
        });
        // workaround
        $('#productAttr').addClass('relative');
    },
    methods: {
        create() {
            var self = this;
            self.$validate(true);
            if (self.$v.invalid) {
                return;
            }
            if (self.loading.create) {
                return;
            }
            self.loading.create = !self.loading.create;

            var values = self.taggle.getTagValues();
            if (values.length > 0) {
                self.model.attr = values;
            }

            $.ajax({
                url: API.createGood,
                type: 'post',
                data: JSON.stringify(self.model),
                success(resp) {
                    self.alert({
                        show: true,
                        msg: '添加成功',
                        type: 'success'
                    });
                    self.reset();
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp.responseText || '添加失败',
                        type: 'error'
                    });
                }
            }).always(() => {
                self.loading.create = !self.loading.create;
            })
        },
        reset() {
            this.model = {
                name: ""
            };
            this.$resetValidation();
            this.taggle.removeAll();
        }
    },
    vuex: {
        actions: {
            alert: actions.alert
        }
    }
})
export default Create;
</script>
