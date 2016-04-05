<template>
    <div class="panel panel-primary good-create">
        <div class="panel-heading">添加商品</div>
        <div class="panel-body">
            <validator name="v">
                <div class="input-group">
                    <span class="input-group-addon" id="productName">商品名称</span>
                    <input type="text" class="form-control" placeholder="请输入商品名称" aria-describedby="productName" v-model="model.name" v-validate:name="{required:true}" :class="{'red-border': $v.name && $v.name.touched && $v.name.invalid}">
                </div>
                <div class="input-group error-msg" v-if="$v.name.touched && $v.name.invalid">
                    <div v-if="$v.name.required" class="red-color">商品名称不能为空</div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">商品属性</span>
                    <div id="productAttr" class="productAttr"></div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon" id="productAmount">商品链接</span>
                    <input type="text" class="form-control" placeholder="请输入商品链接（选填）" aria-describedby="productAmount" v-model="model.amount">
                </div>
                <div class="float-right btns">
                    <button type="button" class="btn btn-primary" @click="create">添加</button>
                    <button type="button" class="btn btn-danger" @click="reset">取消</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import API from '../../config/api';
import Alert from '../../common/alert.vue';
import actions from '../../vuex/actions';
import Taggle from 'taggle';

var Create = Vue.extend({
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