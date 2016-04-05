import API from '../config/api';

const theme = {
    "default": "default",
    "success": "success",
    "info": "info",
    "warn": "warn",
    "error": "danger"
};

const mutations = {
    ISLOGIN(state, obj) {
        $.ajax({
            url: API.isLogin
        })
    },
    LOGOUT(state, obj) {
        $.ajax({
            url: API.logout,
            type: 'post',
            success(resp) {
                state.user = {};
            },
            error(resp) {
                mutations.ALERT({
                    show: true,
                    msg: resp.responseText || '登出失败',
                    type: 'error'
                })
            }
        })
    },
    MODAL(state, obj) {
        if (obj) {
            state.modal = {
                options: {},
                show: false,
                type: 'default',
                component: ''
            }
            state.modal.options = obj.options;
            state.modal.show = obj.show;
            state.modal.component = obj.component;

            if (state.modal.type && theme[state.modal.type]) {
                state.modal.type = theme[state.modal.type];
            } else {
                state.modal.type = theme.default;
            }
        }
    },
    ALERT(state, obj) {
        if (obj) {
            if (state.alert.timer) {
                clearTimeout(state.alert.timer);

                state.alert = {
                    show: false,
                    msg: '',
                    type: 'default'
                }
            }
            state.alert.show = !!obj.show;
            state.alert.msg = obj.msg;
            if (obj.type && theme[obj.type]) {
                state.alert.type = theme[obj.type];
            } else {
                state.alert.type = theme.default;
            }

            state.alert.timer = setTimeout(() => {
                state.alert = {
                    show: false,
                    msg: '',
                    type: 'default'
                }
            }, 2000)
        }
    },
    USER(state, obj) {
        $.ajax({
            url: API.user,
            success(resp) {
                state.user = resp;
            },
            error(resp) {
                mutations.ALERT(state, {
                    show: true,
                    msg: '拉取用户信息失败',
                    type: 'error'
                })
            }
        })
    },
    LOCALE(state, lang) {
        Vue.config.lang = lang;
        state.lang = lang;
    }
}

export default mutations;