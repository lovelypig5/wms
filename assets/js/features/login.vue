<script>
import template from 'templates/login.html';
import API from '../config/api';
import store from '../vuex/store';
import actions from '../vuex/actions';
import Validator from '../validator';
Validator.init();

var Login = Vue.extend({
    store,
    template: template,
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
                })
            }).done((resp) => {
                $("#close").click();
                self.getUser();
                self.$route.router.go({
                    path: '/goods'
                });
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: resp.responseText || '登录失败',
                    type: 'error'
                })
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
})

export default Login;
</script>
