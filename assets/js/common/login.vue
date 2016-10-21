<template>
    <div class="login-popup">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">仓库管理系统</h4>
        </div>
        <div class="modal-body">
            <validator name="v">
                <div class="input-group">
                    <span class="input-group-addon" id="userName">名称</span>
                    <input type="text" class="form-control" placeholder="请输入用户名" aria-describedby="userName" v-model="userName" v-validate:name="{required:true}" :class="{'red-border': $v.name && $v.name.touched && $v.name.invalid}" @keyup.enter="doLogin" />
                </div>
                <div class="input-group error-msg" v-if="$v.name.touched && $v.name.invalid">
                    <div v-if="$v.name.required" class="red-color">用户名不能为空</div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon" id="password">密码</span>
                    <input type="password" class="form-control" placeholder="请输入密码" aria-describedby="password" v-model="password" v-validate:password="{required:true}" :class="{'red-border': $v.password && $v.password.touched && $v.password.invalid}" @keyup.enter="doLogin" />
                </div>
                <div class="input-group error-msg" v-if="$v.password.touched && $v.password.invalid">
                    <div v-if="$v.password.required" class="red-color">密码不能为空</div>
                </div>
            </validator>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" id="close">关闭</button>
            <button type="button" class="btn btn-primary" @click="doLogin">登录</button>
        </div>
    </div>
</template>
<script>
import API from '../config/api';
import store from '../vuex/store';
import actions from '../vuex/actions';
import Validator from '../validator';
Validator.init();

var LoginPopup = Vue.extend({
    store,
    name: 'login',
    data() {
        return {
            userName: "",
            password: "",
            loading: {
                login: false
            }
        }
    },
    methods: {
        doLogin() {
            var self = this;
            self.$validate(true);
            if (self.$v.invalid) {
                return;
            }

            if (self.loading.login) {
                return;
            }
            self.loading.login = !self.loading.login;

            $.ajax({
                url: API.login,
                type: 'post',
                data: JSON.stringify({
                    userName: self.userName,
                    password: self.password
                }),
                success(resp) {
                    self.getUser();
                    $("#close").click();
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp.responseText || '登录失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.login = !self.loading.login;
            })
        }
    },
    vuex: {
        actions: {
            getUser: actions.user,
            alert: actions.alert
        }
    }
});

Vue.component('login', LoginPopup);

export default LoginPopup;
</script>