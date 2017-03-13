<script>
import template from 'templates/login.html';
import API from '../config/api';
import store from '../vuex/store';
import actions from '../vuex/actions';
import Validator from '../validator';
import Cookies from 'js-cookie';
Validator.init();

var Login = Vue.extend({
    store,
    template: template,
    name: 'login',
    data() {
        var rememberMe = !!Cookies.get('rememberMe');
        return {
            userName: rememberMe ? Cookies.get('name') : "",
            password: rememberMe ? Cookies.get('password') : "",
            rememberMe: rememberMe,
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
                if (self.rememberMe) {
                    Cookies.set('rememberMe', self.rememberMe, {
                        expires: 365,
                        domain: 'wms.out2man.com'
                    });
                    Cookies.set('name', self.userName, {
                        expires: 365,
                        domain: 'wms.out2man.com'
                    });
                    Cookies.set('password', self.password, {
                        expires: 365,
                        domain: 'wms.out2man.com'
                    });
                }
                else {
                    Cookies.remove('rememberMe');
                    Cookies.remove('name');
                    Cookies.remove('password');
                }
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
